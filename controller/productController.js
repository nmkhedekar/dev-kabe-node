const axios = require("axios");

const getAllProducts = async (req, res) => {
    const products = await axios.get("https://api.printful.com/products", {
        headers: {
            "Authorization": `Bearer ${process.env.PRINTFULL_API}`
        }
    });
    res.status(200).json({ products: products.data });
};

const getProduct = async (req, res) => {
    const product = await axios.get(`https://api.printful.com/products/${req.body.id}`, {
        headers: {
            "Authorization": `Bearer ${process.env.PRINTFULL_API}`
        }
    });
    res.status(200).json({ product: product.data });
};

const createTask = async (req, res) => {
    const taskCreated = await axios.post(`https://api.printful.com/mockup-generator/create-task/${req.body.id}`, {
        headers: {
            "Authorization": `Bearer ${process.env.PRINTFULL_API}`,
            "Content-Type": "application/json"
        },
        body: req.body.data
    });
    res.status(201).json({ taskCreated: taskCreated.data });
};

const getTask = async (req, res) => {
    const taskData = await axios.get(`https://api.printful.com/mockup-generator/task?task_key=${req.body.taskId}`, {
        headers: {
            "Authorization": `Bearer ${process.env.PRINTFULL_API}`
        }
    });
    res.status(200).json({ getTask: taskData.data });
};

const printFiles = async (req, res) => {
    const printFilesData = await axios.get(`https://api.printful.com/mockup-generator/printfiles/${req.body.prdId}`, {
        headers: {
            "Authorization": `Bearer ${process.env.PRINTFULL_API}`
        }
    });
    res.status(200).json({ printFiles: printFilesData.data });
};

module.exports = {
    getAllProducts,
    getProduct,
    createTask,
    getTask,
    printFiles
}