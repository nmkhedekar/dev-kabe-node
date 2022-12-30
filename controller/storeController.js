const axios = require("axios");

const syncProduct = async (req, res) => {
    const syncProductData = await axios.put(`https://api.printful.com/store/products/${req.body.prdId}`, {
        headers: {
            "Authorization": `Bearer ${process.env.PRINTFULL_API}`,
            "Content-Type": "application/json"
        },
        body: req.body.data
    });
    res.status(201).json({ syncProduct: syncProductData.data });
};

module.exports = {
    syncProduct
}