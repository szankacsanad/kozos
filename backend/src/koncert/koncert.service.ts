import { Injectable } from '@nestjs/common';
import { CreateKoncertDto } from './dto/create-koncert.dto';
import { UpdateKoncertDto } from './dto/update-koncert.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class KoncertService {
  db:PrismaService;
  constructor(db:PrismaService){
    this.db = db
  }
  create(createKoncertDto: CreateKoncertDto) {
    return this.db.koncert.create({
      data:createKoncertDto
    });
  }

  findAll() {
    return this.db.koncert.findMany();
  }

  findOne(id: number) {
    return this.db.koncert.findUnique({
      where:{
        id:id
      }
    });
  }

  update(id: number, updateKoncertDto: UpdateKoncertDto) {
    return this.db.koncert.update({
      where:{
        id:id
      },
      data:updateKoncertDto
    });
  }

  remove(id: number) {
    return this.db.koncert.delete({
      where:{
        id:id
      }
    });
  }
}
