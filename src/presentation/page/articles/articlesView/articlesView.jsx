import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Stack, Pagination, Select, MenuItem, FormControl, InputLabel, Slider } from '@mui/material';
import SkeletonCard from '../../../components/articlesSkeleton/articlesSkeleton';
import { getAllProductsApplication } from '../../../../application/products/products.application';
import DialogMessage from '../../../components/DialogMessage/DialogMessage';
import { useProductActions } from '../../../hooks/store/useProductActionsStore';

const ArticlesView = () => {


    const { addAllProductsAction } = useProductActions()

    const [isLoadingData, setIsLoadingData] = useState(true);
    const [products, setProducts] = useState([]);
    const [displayedProducts, setDisplayedProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(5); 

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all'); 

    const [totalPages, setTotalPages] = useState(1); 

    const [rangePrice, setRangePrice] = useState([0,100])
    const [minRangePrice, setMinRangePrice] = useState(0)
    const [maxRangePrice, setMaxRangePrice] = useState(100)
    const [sortDirectionPrice, setSortDirectionPrice] = useState('none')

    const [sortDirectionRate, setSortDirectionRate] = useState('none')

    const [alwaysFull, setAlwaysFull] = useState([])

    const [objDialogMessage, setObjDialogMessage] = useState({
        title: '',
        body: '',
        buttonCancel: false,
        buttonAccept: false,
        type: 0
    });
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        setObjDialogMessage({
            title: '',
            body: '',
            buttonCancel: false,
            buttonAccept: false,
            type: 1,
        });
        setDialog(true);
        getAllProducts();
        setProductsPerPage('all')
    }, []);

    useEffect(() => {
        setSortDirectionPrice('none')
        setSortDirectionRate('none')

        // Update displayed products whenever productsPerPage, currentPage, or selectedCategory changes
        let filteredProducts = selectedCategory === 'all' ? products : products.filter(product => product.category === selectedCategory);
        const totalFiltered = filteredProducts.length;
        
        // Calculate total pages
        setTotalPages(productsPerPage === 'all' ? 1 : Math.ceil(totalFiltered / productsPerPage));
        
        // Ensure current page is valid
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
        
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = productsPerPage === 'all' ? filteredProducts.length : startIndex + productsPerPage;
        setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
        setAlwaysFull(filteredProducts.slice(startIndex, endIndex))
        
    }, [products, productsPerPage, currentPage, selectedCategory]);

    const getAllProducts = () => {
        getAllProductsApplication()
            .then(resp => {
                addAllProductsAction(resp)
                setLimitPriceFunction(resp)
                setProducts(resp);
                setCategories([...new Set(resp.map(product => product.category))]);
                setIsLoadingData(false);
                setDialog(false);
            })
            .catch(err => {
                setObjDialogMessage({
                    title: '',
                    body: 'Error loading information',
                    buttonCancel: false,
                    buttonAccept: false,
                    buttonClose: true,
                    type: 3
                });
            });
    };

    const valuetext = (value) => `$${value}`;

    const setLimitPriceFunction = ( products ) => {
        const priceSort = products.sort((a, b) => a.price - b.price);
        setMinRangePrice(priceSort[0].price)
        setMaxRangePrice(priceSort.at(-1).price)
    }

    const orderedProductPrice = ( { target } ) => {
        setSortDirectionPrice(target.value)
        setSortDirectionRate('none')

        if (target.value === '<') {
            const sort = alwaysFull.sort((a, b) => a.price - b.price);
            setDisplayedProducts(sort)
        }
        else if (target.value === '>') {
            const sort = alwaysFull.sort((a, b) => b.price - a.price);
            setDisplayedProducts(sort)
        }
    }

    const orderedProductRate = ( { target } ) => {
        setSortDirectionRate(target.value)
        setSortDirectionPrice('none')
        if (target.value === '<') {
            const sort = alwaysFull.sort((a, b) => a.rating.rate - b.rating.rate);
            setDisplayedProducts(sort)
        }
        else if (target.value === '>') {
            const sort = alwaysFull.sort((a, b) => b.rating.rate - a.rating.rate);
            setDisplayedProducts(sort)
        }
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleProductsPerPageChange = (event) => {
        setProductsPerPage(event.target.value);
        setCurrentPage(1); // Reset to first page when products per page changes
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setCurrentPage(1); // Reset to first page when category changes
    };

    const handleChangePriceRange = (event, newValue) => {
        const newData = alwaysFull.filter(obj => obj.price >= newValue[0] && obj.price <= newValue[1])
        setDisplayedProducts(newData)
        setRangePrice(newValue);
    };

    return (
        <div>
            {dialog ?
                <DialogMessage
                    info={objDialogMessage}
                    handleAcceptDialog={() => setDialog(false)}
                    handleCancelDialog={() => setDialog(false)}
                    handleCloseDialog={() => setDialog(false)}
                />
                : null
            }
            <Grid container spacing={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>

                {/* Pagination */}
                <Grid item xs={12} sm={12} md={5} lg={2} >
                    <FormControl fullWidth style={{ marginBottom: '20px' }}>
                        <InputLabel id="products-per-page-label">Products Page</InputLabel>
                        <Select
                            labelId="products-per-page-label"
                            id="products-per-page"
                            value={productsPerPage}
                            onChange={handleProductsPerPageChange}
                            label="Products per Page"
                        >
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value="all">All</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Categories */}
                <Grid item xs={12} sm={12} md={5} lg={3} >
                    <FormControl fullWidth style={{ marginBottom: '20px', minWidth: 120 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            label="Category"
                        >
                            <MenuItem value="all">All</MenuItem>
                            {categories.map((category, index) => (
                                <MenuItem key={index} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                {/* Price Ranges */}
                <Grid item xs={6} sm={6} md={5} lg={3} >
                        <InputLabel id="products-per-page-label">Price Ranges</InputLabel>
                    <FormControl fullWidth style={{ marginBottom: '20px' }}>
                        <Slider
                            value={rangePrice}
                            onChange={handleChangePriceRange}
                            valueLabelDisplay="auto"
                            min={minRangePrice}
                            max={maxRangePrice}
                            valueLabelFormat={valuetext}
                        />
                    </FormControl>
                </Grid>

                {/* Sort Price */}
                <Grid item xs={6} sm={6} md={5} lg={2} >
                    <FormControl fullWidth style={{ marginBottom: '20px' }}>
                        <InputLabel id="SortPrice">Sort Prices</InputLabel>
                        <Select
                            labelId="SortPrice"
                            id="SortPrice"
                            value={sortDirectionPrice}
                            onChange={orderedProductPrice}
                            label="SortPrice"
                        >
                            <MenuItem value='<'> minor a mayor </MenuItem>
                            <MenuItem value='>'> mayor a minor </MenuItem>
                            <MenuItem value="none"> none </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Sort Rate */}
                <Grid item xs={12} sm={12} md={5} lg={2} >
                    <FormControl fullWidth style={{ marginBottom: '20px' }}>
                        <InputLabel id="SortRate">Sort Rate</InputLabel>
                        <Select
                            labelId="SortRate"
                            id="SortRate"
                            value={sortDirectionRate}
                            onChange={orderedProductRate}
                            label="SortRate"
                        >
                            <MenuItem value='<'> minor a mayor </MenuItem>
                            <MenuItem value='>'> mayor a minor </MenuItem>
                            <MenuItem value="none"> none </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={0}>
                {isLoadingData
                    ? Array.from({ length: 10 }, (_, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                            <SkeletonCard isLoadingData={isLoadingData} />
                        </Grid>
                    ))
                    : displayedProducts.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                            <SkeletonCard isLoadingData={isLoadingData} infoItem={product} />
                        </Grid>
                    ))
                }
            </Grid>

            {/* Pagination */}
            {productsPerPage !== 'all' && (
                <Stack spacing={2} style={{ marginTop: '20px', justifyContent: 'center', alignItems: 'center' }}>
                    <Pagination
                        count={totalPages} // Total number of pages
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Stack>
            )}

        </div>
    );
};

export default ArticlesView;
