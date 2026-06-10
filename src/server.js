import express from "express"
import { prisma } from "./lib/prisma.ts"

const app = express()
const PORT = 3000
app.get("/", async (req, res) =>{

    const user = await prisma.user.findMany()
    res.json(user)
})

app.listen(PORT, () => {
  console.log("servidor rodando"); // Isso é uma mensagem de log, NÃO um endereço
});