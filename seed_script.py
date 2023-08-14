from content.models import PostContent, Category, Tag
from django_seed import Seed
from django.contrib.contenttypes.models import ContentType
seeder = Seed.seeder()


# run from python shell with:
# exec(open('seed_script.py').read())

# List of categories and tags to choose from
categories_list = ['Beginner', 'Intermediate', 'Advanced', 'Expert']
tags_list = ['Kopfstimme', 'Randkannte', 'Vibrato', 'Musculus_Vocalis',
             'Ansatz', 'Cricoterioideus', 'Lateralis', 'Obertoene']

# Seed the Category model with the provided list (if they don't already exist)
for category_name in categories_list:
    Category.objects.get_or_create(name=category_name)

# Seed the Tag model with the provided list (if they don't already exist)
for tag_label in tags_list:
    Tag.objects.get_or_create(label=tag_label)

# Seeding the Content model and associating it with categories
for _ in range(100):
    content = PostContent.objects.create(
        title=seeder.faker.sentence(),
        body=seeder.faker.text(),
        embed_video_url="https://vimeo.com/850841152?share=copy",
    )
    # Associating the content with a random category
    random_category = Category.objects.filter(
        name__in=categories_list).order_by('?').first()
    content.category.add(random_category)

    # Associating the content with a random category
    random_tag = Tag.objects.filter(
        label__in=tags_list).order_by('?').first()
    content.tags.add(random_tag)

