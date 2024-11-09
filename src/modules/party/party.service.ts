import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePartyDto, UpdatePartyDto } from './dto/party.dto';

import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class PartyService {
  constructor(private readonly prisma: PrismaService) { }

  async create(userId: number, dto: CreatePartyDto) {
    const { goal, name, description } = dto
    const slug = await this.generateSlug(name)

    return this.prisma.party.create({
      data: {
        goal: goal,
        name: name,
        description: description,
        creatorId: userId,
        slug: slug
      },
    });
  }

  async findAll() {
    return this.prisma.party.findMany();
  }

  async findOne(id: number) {
    return this.prisma.party.findUnique({
      where: { id },
    });
  }

  async findBySlug(slug: string) {
    const party = await this.prisma.party.findUnique({
      where: { slug },
    });

    if (!party) throw new NotFoundException('Festa não encontrada!')
    return party
  }

  async update(id: number, dto: UpdatePartyDto) {
    const { description, goal, name } = dto
    return this.prisma.party.update({
      where: { id },
      data: {
        description,
        goal,
        name
      },
    });
  }

  async remove(id: number) {
    return this.prisma.party.delete({
      where: { id },
    });
  }


  private slugify = (str: string): string => {
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    return str
  }

  private randomSuffix = (length = 6) => {
    return Math.random().toString(36).substring(2, 2 + length);
  }

  private async generateSlug(name: string): Promise<string> {
    let slug = this.slugify(name);
    let uniqueSlug = slug + '-' + this.randomSuffix();


    // Verifica se o slug já existe no banco de dados
    while (await this.doesSlugExist(uniqueSlug)) {
      uniqueSlug = slug + '-' + this.randomSuffix();
    }

    return uniqueSlug;
  }

  private async doesSlugExist(slug: string): Promise<boolean> {
    // Verifica se existe alguma Party com o slug dado
    const party = await this.prisma.party.findUnique({
      where: { slug },
    });
    return party ? true : false;
  }
}
