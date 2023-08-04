# Generated by Django 4.2.1 on 2023-08-04 09:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0005_rename_vimeo_video_url_content_embed_video_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='ContentImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='content_images/')),
                ('content', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='content.content')),
            ],
        ),
    ]
