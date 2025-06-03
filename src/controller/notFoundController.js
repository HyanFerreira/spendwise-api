export const notFoundController = (req, res) => {
    return res.status(404).json({
        message: "Erro! A sua página não foi encontrada! Entre em uma página que exista no sistema!"
    })
}