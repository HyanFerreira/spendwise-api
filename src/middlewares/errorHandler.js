export const errorHandler = (error, req, res, next) => {
    console.error(error)
    if(error?.type === 'entity.parse.failed' && error.message.includes('JSON')){
        return res.status(500).json({
            message: "O seu JSON está com informações invalidas! Tente novamente!"
        })
    }

    return res.status(500).json({
        message: "Ocorreu um erro fora do padrão! Tente novamente ou tente mais tarde!"
    })
}
