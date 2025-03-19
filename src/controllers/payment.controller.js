import{z} from "zod";

const paymentSchema = z.object({
    data: z.string().datetime(),
    valor: z.number().positive(),
    numero: z.number().positive(),
    observacao: z.string().optional()
});

const PaymentController = {
    async createPayment(req, res) {
    try{
        const {nome, email, senha,  data, numerorecibo, usuarioid, valor, observacao} = req.body;
        paymentSchema.parse({nome, email, senha, data, numerorecibo, usuarioid, valor, observacao});
        console.log({nome, email, senha, data, numerorecibo, usuarioid, valor, observacao});
        res.status(201).json({message:'Payment created successfully!'});
       } catch (error) {
            if (error instanceof z.ZodError){
                return res.status(400).json({
                    message: "Erro de validação",
                    errors: error.errors.map(
                        err => ({
                            atributo: err.path[0],
                            mensagem: err.message
                        })
                    )
                })
            }
              res.status(500).json({ message: error.message });
        }
    },

    async updatePayment(req, res){
        try{
            const {id} = req.params;
            const {valor, numero, data, observacao} = req.body;
            paymentSchema.parse({valor, numero, data, observacao});
            res.status(200).json({message:'Payment updated successfully!', data:{id, valor, numero, data, observacao} });
        } catch (error) {
            if (error instanceof z.ZodError){
                return res.status(400).json({ message:"validation error", details: error.errors});
            }
            return res.status(500).json({ message: error.message });
        }
    },
}

export default PaymentController;