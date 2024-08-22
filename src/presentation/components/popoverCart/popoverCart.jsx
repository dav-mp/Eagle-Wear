import React, { useState, useEffect, useMemo } from 'react'
import { Badge, IconButton, Popover, Typography, List, ListItem, Grid, Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useSelector } from 'react-redux';

import './popoverCart.css'
import DialogMessage from '../DialogMessage/DialogMessage';
import { useCartActions } from '../../hooks/store/useCartActionsStore';

const PopoverCart = () => {
    

    const productsInCart = useSelector((state) => state.cart)

    const { substractQuatityProductAction, addQuantityProductAction } = useCartActions()

    const [anchorEl, setAnchorEl] = useState(null);
    const [objDialogMessage, setobjDialogMessage] = useState({
        title: '',
        body: '',
        buttonCancel: false,
        buttonAccept: false,
        type: 0
    })
    const [dialog, setDialog] = useState(false)
    const [productToDelete, setProductToDelete] = useState({})
    // const [productsSet, setProductsSet] = useState(new Map())
    

    // useEffect(() => {

    //     if ( productsInCart.length === 0 ) return

    //     const mapAux = new Map(productsSet)
        
    //     console.log('Si lo tiene....', productsSet);

    //     const newProduct = productsInCart.at(-1)
        
    //     if (!productsSet.has(newProduct.id)) {
    //         mapAux.set(newProduct.id, {
    //             ...newProduct,
    //             quantity: 1,
    //         })
    //         setProductsSet( mapAux )
    //     }else {
    //         const existingProduct = mapAux.get(newProduct.id);
    //         const updatedProduct = {
    //             ...existingProduct,
    //             quantity: (existingProduct.quantity || 0) + 1,
    //         };
    //         mapAux.set(existingProduct.id, updatedProduct);
    //         setProductsSet( mapAux )
    //     }

    // }, [productsInCart])
    

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const substractQuatityStatus = ( product ) => {

        setProductToDelete(product)
        
        if(product.quantity === 1){
            setobjDialogMessage({
                title: 'Delete Product',
                body: '¿are you sure to delete the product?',
                buttonCancel: true,
                buttonAccept: true,
                type: 0
            })
            setDialog(true)
            return
        }

        substractQuatityState(product)
      
    }

    const addQuantityProduct = (product) => {
        addQuantityProductAction(product)
    }

    const substractQuatityState = (product, del = false) => {
        console.log('AYUDAAA', del);
        
        substractQuatityProductAction(product, del)
        setProductToDelete({})
    }

    const handleAcceptDialog = () => {
        substractQuatityState(productToDelete, true)
        setDialog(false)
    }

    const handleCancelDialog = () => {
        setDialog(false)
    }

    const handleCloseDialog = () => {
        setDialog(false)
    }

    const openPopover = Boolean(anchorEl);


    return (
        <>
            {dialog ?
                <DialogMessage
                    info={objDialogMessage}
                    handleAcceptDialog={handleAcceptDialog}
                    handleCancelDialog={handleCancelDialog}
                    handleCloseDialog={handleCloseDialog}
                />
                : null
            }
            <IconButton color="inherit" onClick={handleClick}>
                <Badge badgeContent={Object.keys(productsInCart).length} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <Popover
                open={openPopover}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                sx={{
                    width: 450
                }}
            >
                <Typography variant="h6" sx={{ p: 2 }}>
                    Productos
                </Typography>
                <List>
                    {/* Puedes reemplazar estos elementos con tus datos reales */}
                    <ListItem>
                        <Grid container spacing={0}>
                            {Object.entries(productsInCart).map(([key, prod]) => (
                                <Grid container key={key} spacing={2} py={1}>
                                    <Grid item xs={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                        <Typography variant='body1' className='title'>{prod.title}</Typography>
                                    </Grid>
                                    <Grid item xs={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                                        <Button  color='error' size='small' onClick={() => substractQuatityStatus(prod)}><Typography variant='h6'>-</Typography></Button>
                                        <Typography>{prod.quantity}</Typography>
                                        <Button  color='primary' size='small' onClick={() => addQuantityProduct(prod)}><Typography variant='h6'>+</Typography></Button>
                                    </Grid>
                                    <Grid item xs={4} display={'flex'} justifyContent={'center'} alignItems={'center'} textAlign={'center'}>
                                        <Typography variant='h6' className='title'>${prod.price * prod.quantity}</Typography>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </ListItem>
                </List>
            </Popover>
        
        </>
    )
}

export default PopoverCart

