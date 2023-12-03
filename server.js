import 'dotenv/config'
import express from 'express'
import {caching} from 'cache-manager';
import bodyParser from "body-parser";
import cors from "cors";
import {v4 as uuidv4} from 'uuid';

const memoryCache = await caching('memory', {
    max: 100,
    ttl: 10 * 1000 /*milliseconds*/,
});
const app = express()
const port = process.env.PORT || 3162;
const url = process.env.URL || 'http://localhost:3162'
app.use(cors());
app.use(bodyParser.json());
const apiVersion = 'v1'

// Root path
app.get('/', (req, res) => {
    res.send('Hello Avaxlunch!')
})

app.listen(port, () => {
    console.log(`Server start on: ${port}`)
})
// Issuer


// Verifier


// Holder


// Short URL
app.post(`${apiVersion}/short-url`, async (req, res) => {
    try {
        const {data} = req.body;
        const uuid = uuidv4();
        await memoryCache.set(uuid, data);

        res.send({
            data: `${url}/${apiVersion}/short-url/${uuid}`,
            success: true,
        })
    } catch (e) {
        console.log(e)
        res.send({
            error: e?.message,
            success: false,
        })
    }
});

app.get(`${apiVersion}/short-url/:uuid`, async (req, res) => {
    try {
        const {uuid} = req.params;
        const data = await memoryCache.get(uuid);
        if (!data) {
            res.send({
                error: 'Not found',
                success: false,
            })
        }
        res.send({
            data,
            success: true,
        })
    } catch (e) {
        console.log(e)
        res.send({
            error: e?.message,
            success: false,
        })
    }
});