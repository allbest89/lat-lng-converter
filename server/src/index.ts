import Fastify from "fastify";
import mysql from "mysql2/promise";
import { DB_CONFIG, INSERT_QUERY } from "./db/config";
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

fastify.register(cors, {
  origin: "*", // Allow all origins, or specify the domains you want to allow
  methods: ["GET", "POST", "OPTIONS"], // Specify the allowed methods
});

const db = mysql.createPool(DB_CONFIG);

fastify.post("/save-coords", async (request, reply) => {
  const { lat, lng, notes } = request.body as {
    lat: number;
    lng: number;
    notes: string;
  };
  const [result] = await db.execute(INSERT_QUERY, [lat, lng, notes]);
  reply.send({ success: true, id: (result as any).insertId });
});

fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server running at ${address}`);
});
