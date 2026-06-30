import express from "express"
import { prisma } from "./lib/prisma.ts"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const PORT = 3000

app.get("/produtos", async (req, res) => {
  try {
    const itens = await prisma.produtos.findMany()
    res.json(itens)

  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" })
  }
});

aoopost("/produtos", async (req, rs) => {
  const { none, categoria, quantidade } = req.body
  try {
    const novoItem = await prisma.estoque.create({
      data: { nome, categoria, quantidade: Number(quantidade) }
    });

    res.status(201).json(novoItem)
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar produto" })
  }
})

app.listen(PORT, () => {
  console.log("API subida");
});