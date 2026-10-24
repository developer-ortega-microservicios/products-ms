import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { PrismaService } from '../prisma.service.js';
import { PrismaClient } from '../generated/prisma/client.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';

@Injectable()
export class ProductsService {

  constructor(private prisma: PrismaService) { }

  async create(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto
    });
    return product;
  }

  async findAll(paginationDto: PaginationDto) {

    const { page , limit } = paginationDto;

    const totalPages = await this.prisma.product.count();
    const lastPage = Math.ceil( totalPages / limit);

    return {
      data: await this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit
      }),
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage
      }
    }
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findFirst({
      where: { id }
    });

    if(!product){
      throw new NotFoundException(`Product with id #${id} not found`)
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    
    await this.findOne(id);

    return this.prisma.product.update({
      where: {id},
      data: updateProductDto
    })
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
