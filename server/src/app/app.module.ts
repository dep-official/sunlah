import { Module } from '@nestjs/common';
import { AudioModule } from '../audio/audio.module';
import { ArtistsModule } from '../artists/artists.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, AudioModule, ArtistsModule],
})
export class AppModule {} 