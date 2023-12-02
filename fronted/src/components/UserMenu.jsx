import React, { Fragment, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "@mui/material";
import {
    Divider,
    ListItemIcon,
    Menu,
    MenuItem,
} from "@mui/material";


const UserMenu = (props) => {
    const navigateTo = useNavigate();
    const iconButtonRef = React.useRef(null); // Step 1: Create a ref

    const handleMoreIconClick = () => {
        navigateTo("/currentProfile");
    };

    const [userMenuOpen, setUserMenuOpen] = useState(false); // Initialize state with false

    const open = Boolean(userMenuOpen);

    const handleOpenUserMenu = () => {
        console.log('props', props.props);
        setUserMenuOpen(props.props); // Open the menu
    };

    const handleClose = () => {
        setUserMenuOpen(false); // Close the menu
    };

    const handleLogOut = () => {
        localStorage.removeItem("authToken");
        navigateTo("/login");
    };

    const [profileData, setProfileData] = useState({});
    const [firstLetter, setFirstLetter] = useState("U");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/me");

                if (response.status !== 200) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const { firstName, lastName, title } = response.data.result;
                setProfileData({ firstName, lastName, title });
                setFirstLetter(firstName[0]);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                // setError("Error fetching profile data. Please try again later."); // You might need to define `setError`
            }
        };

        fetchProfileData();
    }, []);

    return (
        <Fragment>
            <Tooltip>
                <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu} ref={iconButtonRef}>
                    <Avatar alt="Remy Sharp" src="/AnonymousUser.png" />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={iconButtonRef.current} // Step 2: Pass the ref as anchorEl
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem onClick={handleClose}>
                    <span style={{ marginRight: "auto", paddingRight: "12px" }}>החשבון שלי</span>
                    <Avatar />
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose} style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "auto" }}>הגדרות</span>
                    <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
                <MenuItem onClick={handleLogOut} style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ marginRight: "auto" }}>התנתקות</span>
                    <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default UserMenu;