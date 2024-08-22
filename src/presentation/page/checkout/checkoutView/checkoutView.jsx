import React, { useEffect, useState } from 'react'
import { Box, Button, Grid, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useNavigationUtil from '../../../../utils/GotoPath';
const products = [
    {
      name: 'Professional plan',
      desc: 'Monthly subscription',
      price: '$15.00',
    },
    {
      name: 'Dedicated support',
      desc: 'Included in the Professional plan',
      price: 'Free',
    },
    {
      name: 'Hardware',
      desc: 'Devices needed for development',
      price: '$69.99',
    },
    {
      name: 'Landing page template',
      desc: 'License',
      price: '$49.99',
    },
  ];


const checkoutView = () => {

    const productsInCart = useSelector((state) => state.cart)
    const { goTo } = useNavigationUtil()

    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {

        let sum = 0
        Object.entries(productsInCart).forEach((value, index) => {
            sum += value[1].price * value[1].quantity 
        })

        setTotalPrice(sum)
      
    }, [productsInCart])


    const path = () => {
        goTo('/')
    }
    

    return (
        <Grid container maxWidth="lg" sx={{ height: { xs: '100%'}, width: '100%' }} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Grid
            item
            xs={12}
            sm={6}
            lg={6}
            sx={{
                display: {  md: 'flex' },
                flexDirection: 'column',
                backgroundColor: 'background.paper',
                borderRight: { sm: 'none', md: '1px solid' },
                borderColor: { sm: 'none', md: 'divider' },
                alignItems: 'start',
                pt: 4,
                px: 5,
                gap: 4,
            }}
            >
            <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
                width: '100%',
                }}
            >
                <Grid item xs={12} sm={12} lg={12} mb={4}>
                <Button variant='contained' startIcon={<ArrowBackIcon/>} size='small' onClick={path}>
                    Back to product list
                </Button>
            </Grid>
                <Typography variant="h3" color="text.secondary" pb={3}>
                    Checkout
                </Typography>
                <List disablePadding>
                    {Object.entries(productsInCart).map(([key, prod]) => (
                        <ListItem key={prod.title} sx={{ py: 1, px: 0 }}>
                            <ListItemText
                                sx={{ mr: 2 }}
                                primary={prod.title}
                            />
                            <Typography variant="h6" fontWeight="medium">
                                ${prod.price * prod.quantity}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
                <Typography variant="subtitle2" color="text.secondary" pt={3}>
                    Total
                </Typography>
                <Typography variant="h4" gutterBottom>
                ${ totalPrice }
                </Typography>
            </Box>
            <Grid item xs={12} sm={12} lg={12} mb={4}>
                <Button variant='contained' endIcon={<ArrowForwardIcon/>} size='large'>
                    Checkout
                </Button>
            </Grid>
            </Grid>
        </Grid>
    )
}

export default checkoutView