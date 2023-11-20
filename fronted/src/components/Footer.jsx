import React from 'react';

function Footer() {
    return (
    <footer>
        <p>&copy; Copyright  Universty Dictionary {new Date().getFullYear()}</p>
    </footer>)
}

export default Footer;


// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';

// function Copyright(props) {
//     return (
//       <Typography variant="body2" color="text.secondary" align="center" {...props}>
//         {'Copyright © '}
//         <Link color="inherit" href="https://mui.com/">
//           Your Website
//         </Link>{' '}
//         {new Date().getFullYear()}
//         {'.'}
//       </Typography>
//     );
//   }