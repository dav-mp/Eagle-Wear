import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import { Grid, Stack } from '@mui/material';
import Rating from '@mui/material/Rating';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import './articlesSkeleton.css'
import { useCartActions } from '../../hooks/store/useCartActionsStore';

import ModalProduct from '../modalProductDesc/modalProductDesc'

function Media(props) {
  const { loading = false, infoItem } = props;

  const { addProductsAction } = useCartActions()

  const [openModalproduct, setOpenModalproduct] = useState(false)
  const [productSelected, setproductSelected] = useState({})

  const addProductTocart = ( product ) => {
    addProductsAction(product)
  }
  
  const showModalProduct = (product) => {
    setproductSelected(product)
    setOpenModalproduct(!openModalproduct)
  }
  

  return (
    <div className='Card'>
      <Card  sx={{ maxWidth: 345, m: 2, borderRadius: 5 }}>
        <CardHeader
          avatar={
            loading ? (
              <Skeleton animation="wave" variant="circular" width={40} height={40} />
            ) : (
              <Avatar
                alt="SPS"
                src="https://lh3.googleusercontent.com/proxy/2M-3b0rBRaoI6QJ5yo_vSW89MxWwqiyyLwH_wBIbEA0D_mVwQNk8cLc8Tuc5mYzHjdgtIIaLShKBy7b6J8ezHUMvAZEjR8tlcLAnjvwp"
              />
            )
          }
          // action={
          //   loading ? null : (
          //     <IconButton aria-label="settings">
          //       <MoreVertIcon />
          //     </IconButton>
          //   )
          // }
          title={
            loading ? (
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6, textWrap: 'wrap' }}
              />
            ) : (
              <Typography noWrap variant="h6" color="text.primary" component="p" >
                  {
                      infoItem.title
                  }
              </Typography>
            )
          }
          subheader={
            loading ? (
              <Skeleton animation="wave" height={10} width="40%" />
            ) : (
              infoItem.category
            )
          }
        />
        {loading ? (
          <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
        ) : (
          <CardMedia
            component="img"
            height="250"
            image={infoItem.image}
            alt="Image Item"
          />
        )}

        <CardContent>
          {loading ? (
            <React.Fragment>
              <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
              <Skeleton animation="wave" height={10} width="80%" />
              <Grid style={{ display: 'flex', justifyContent: 'start', paddingTop: 20, paddingLeft: 20 }} spacing={3} container>
                  <Skeleton animation="wave" variant="text" width={40} height={40} />
                  <Skeleton animation="wave" variant="text" width={40} height={40} style={{ marginLeft: 20 }}/>
              </Grid>
            </React.Fragment>
          ) : (
              <>
              <Typography noWrap variant="body2" color="text.secondary" component="p" >
                  {
                  infoItem.description
                  }
              </Typography>
                  <Grid container pt={5}>
                      <Grid item xs={12} sm={6} md={6} lg={6} >
                        <Typography variant='h6'>
                        ${ infoItem.price }
                        </Typography>
                        <Rating name="read-only" value={infoItem.rating.rate} readOnly />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6} lg={6} display='flex' justifyContent='center' alignItems='center'>
                            <Button variant='contained' color='primary' onClick={() => showModalProduct(infoItem)}>
                                <Typography variant='body2'>see more...</Typography>
                            </Button>
                      </Grid>
                      <Grid pt={2} item xs={12} sm={12} md={12} lg={12} display='flex' justifyContent='center' alignItems='center'>
                            <Button variant='contained' color='success' startIcon={<ShoppingCartIcon />} onClick={() => addProductTocart(infoItem)}>
                                Add Cart...
                            </Button>
                      </Grid>
                  </Grid>
              </>
          )}
        </CardContent>
      </Card>
      {openModalproduct
        ? <ModalProduct 
            showModalProduct={showModalProduct}
            productSelected={productSelected}
            />
        : null
      }
    </div>
  );
}


export default function SkeletonCard({ isLoadingData, infoItem }) {
  return (
    <div>
      <Media loading={isLoadingData} infoItem={infoItem}/>
      {/* <Media /> */}
    </div>
  );
}