import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://user:password@localhost:27017/authDB?authSource=admin', {
           // useUnifiedTopology: true,
           // useNewUrlParser: true,
        }),
    ],
    exports: [MongooseModule], // Export the MongooseModule so it can be used in other modules
})
export class DatabaseModule { }
