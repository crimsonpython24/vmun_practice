# Generated by Django 3.0.8 on 2020-07-30 11:39

import django.contrib.auth.models
import django.contrib.auth.validators
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0011_update_proxy_permissions'),
    ]

    operations = [
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='school_name')),
                ('major', models.CharField(max_length=150, verbose_name='major')),
                ('start', models.IntegerField(verbose_name='start year')),
                ('end', models.IntegerField(verbose_name='end year')),
                ('description', models.TextField(blank=True, max_length=500, verbose_name='description')),
            ],
        ),
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('facebook', 'Facebook'), ('twitter', 'Twitter'), ('github', 'Github'), ('linkedin', 'LinkedIn'), ('twitch', 'Twitch'), ('others', 'Others')], max_length=10, verbose_name='name')),
                ('url', models.URLField(verbose_name='url')),
                ('publicity', models.BooleanField(default=False, verbose_name='publicity')),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('country', models.CharField(max_length=100, verbose_name='city')),
                ('city', models.CharField(blank=True, max_length=100, verbose_name='city')),
                ('current', models.BooleanField(default=False, verbose_name='current_residence')),
                ('publicity', models.BooleanField(default=False, verbose_name='publicity')),
            ],
        ),
        migrations.CreateModel(
            name='Work',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('organization', models.CharField(max_length=150, verbose_name='organization')),
                ('title', models.CharField(max_length=150, verbose_name='title')),
                ('start', models.IntegerField(verbose_name='start year')),
                ('end', models.IntegerField(verbose_name='end year')),
                ('description', models.TextField(blank=True, max_length=500, verbose_name='description')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('slug', models.SlugField(unique=True)),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='', verbose_name='avatar')),
                ('birthday', models.DateField(blank=True, null=True, verbose_name='birthday')),
                ('gender', models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female'), ('others', 'Non-binary'), ('none', 'Prefer not to say')], max_length=10, null=True, verbose_name='gender')),
                ('introduction', models.TextField(blank=True, max_length=500, null=True, verbose_name='introduction')),
                ('education', models.ManyToManyField(blank=True, to='accounts.Education')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('links', models.ManyToManyField(blank=True, to='accounts.Link')),
                ('places', models.ManyToManyField(blank=True, to='accounts.Place')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
                ('work', models.ManyToManyField(blank=True, to='accounts.Work')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
