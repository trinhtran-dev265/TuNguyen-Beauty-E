import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { ProductService } from './product.service';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/products',

        filename: (req, file, callback) => {
          const uniqueName = Date.now() + extname(file.originalname);

          callback(null, uniqueName);
        },
      }),
    }),
  )
  async create(
    @Body()
    body: CreateProductDto,

    @UploadedFile()
    file?: Express.Multer.File,
  ) {
    return this.productService.create({
      ...body,

      image: file ? file.filename : '',
    });
  }

  @Get()
  async getProducts() {
    return this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(
    @Param('id')
    id: string,
  ) {
    return this.productService.getProductById(id);
  }

  @Patch(':id')
  async update(
    @Param('id')
    id: string,

    @Body()
    body: UpdateProductDto,
  ) {
    return this.productService.update(id, body);
  }

  @Delete(':id')
  async delete(
    @Param('id')
    id: string,
  ) {
    return this.productService.delete(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id')
    id: string,
  ) {
    return this.productService.toggleStatus(id);
  }
}
