import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ContactService } from './contact/contact.service';
import { ContactModule } from './contact/contact.module';
import { AddressController } from './address/address.controller';
import { AddressService } from './address/address.service';
import { AddressModule } from './address/address.module';

@Module({
  imports: [CommonModule, UserModule, ContactModule, AddressModule],
  controllers: [AddressController],
  providers: [ContactService, AddressService],
})
export class AppModule {}
