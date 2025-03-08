import axios from "axios"

// const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async (category) => {
    // get all products of a category

    // console.log('fe_helpers_fetchC....', category)
    // const response = await fetch(SummaryApi.categoryWiseProduct.url, {
    //     method: SummaryApi.categoryWiseProduct.method,
    //     headers: {
    //         "content-type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         category: category
    //     })
    // })

    // const dataResponse = await response.json()
    const allProductsUrl = (process.env.REACT_APP_SERVER) ? `https://coaching-q9o7.onrender.com/products` : `http://localhost:3001/products`
    try {
        const token = localStorage.getItem("token")
        const response = await axios.get(allProductsUrl,
            //     {
            //     headers: {
            //         Authorization: `Bearer ${token}`, // Send JWT token in Authorization header
            //         "Content-Type": "application/json",
            //     },
            // },
            {
                params: { category: category } // Pass category as a query parameter
            },

        )
        // console.log('cat res', response)
        return response;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default fetchCategoryWiseProduct