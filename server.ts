import express from 'express'
import { PORT } from './utils/config';
import { errorHandler } from './middleware/errorMiddleware';
import { connectDB } from './database/db';
import * as Colors from 'colors.ts';
const userRouter = require('./routes/userRoutes');
const cors = require("cors");

Colors.colors('','')

connectDB()
const app = express();
app.use(cors({origin:true,credential:true}))
app.use(express.json())
// app.use(express.static('public', { 'extensions': ['html', 'js'] }));

// app.use('/api/projects', require('./routes/projectRoutes'))
app.use('/api/users',userRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log(`server started on port ${PORT}`))