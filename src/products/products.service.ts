import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { PrismaService } from '../prisma.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

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

    const totalPages = await this.prisma.product.count({ where: {available: true}});
    const lastPage = Math.ceil( totalPages / limit);

    return {
      data: await this.prisma.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
          available: true
        }
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
      where: { id, available: true }
    });

    if(!product){
      throw new NotFoundException(`Product with id #${id} not found`)
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: __, ...data } = updateProductDto;
    
    await this.findOne(id);

    return this.prisma.product.update({
      where: {id},
      data: data
    })
  }

  async remove(id: number) {

    await this.findOne(id);

    const product = await this.prisma.product.update({
      where: {id},
      data: {
        available: false
      }
    })

    return product;

    // return this.prisma.product.delete({
    //   where: {id}
    // });
  }
}
