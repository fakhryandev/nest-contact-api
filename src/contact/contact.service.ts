import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Contact, User } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { ValidationService } from 'src/common/validation.service';
import {
  ContactResponse,
  CreateContactRequest,
  UpdateContactRequest,
} from 'src/model/contact.model';
import { Logger } from 'winston';
import { ContactValidation } from './contact.validation';

@Injectable()
export class ContactService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private logger: Logger,
    private prismaService: PrismaService,
    private validationService: ValidationService,
  ) {}

  async create(
    user: User,
    request: CreateContactRequest,
  ): Promise<ContactResponse> {
    this.logger.debug(
      `ContactService.create(${JSON.stringify(user)}, ${JSON.stringify(request)})`,
    );
    const createRequest: CreateContactRequest = this.validationService.validate(
      ContactValidation.CREATE,
      request,
    );

    const contact = await this.prismaService.contact.create({
      data: { ...createRequest, username: user.username },
    });

    return this.toContactResponse(contact);
  }

  async checkContactMustExists(
    username: string,
    contactId: number,
  ): Promise<Contact> {
    const contact = await this.prismaService.contact.findFirst({
      where: {
        username: username,
        id: contactId,
      },
    });

    if (!contact) {
      throw new HttpException('Contact is not found', 404);
    }

    return contact;
  }

  async get(user: User, contactId: number): Promise<ContactResponse> {
    const contact: Contact = await this.checkContactMustExists(
      user.username,
      contactId,
    );

    return this.toContactResponse(contact);
  }

  async update(
    user: User,
    request: UpdateContactRequest,
  ): Promise<ContactResponse> {
    const updateRequest: UpdateContactRequest = this.validationService.validate(
      ContactValidation.UPDATE,
      request,
    );
    let contact: Contact = await this.checkContactMustExists(
      user.username,
      updateRequest.id,
    );

    contact = await this.prismaService.contact.update({
      where: {
        id: contact.id,
        username: user.username,
      },
      data: updateRequest,
    });

    return this.toContactResponse(contact);
  }

  toContactResponse(contact: Contact) {
    return {
      id: contact.id,
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
    };
  }
}
