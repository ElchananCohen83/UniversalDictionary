import { useNavigate } from 'react-router-dom';

function Navigate(page) {
    const navigate = useNavigate();

    const handleNavigation = () => {
        // Navigate to the specified page
        navigate(page);
    };

    return handleNavigation;
}

export default Navigate;