from tags.models import Tag, TaggedItem
from content.models import Content, Category
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
    content = Content.objects.create(
        title=seeder.faker.sentence(),
        body=seeder.faker.text(),
        embed_video_url="https://vimeo.com/850841152?share=copy",
    )
    # Associating the content with a random category
    random_category = Category.objects.filter(
        name__in=categories_list).order_by('?').first()
    content.category.add(random_category)

# Associating each Content with random tags
content_type = ContentType.objects.get_for_model(Content)
for content in Content.objects.all():
    number_of_tags = seeder.faker.random_int(min=1, max=len(tags_list))
    tags = seeder.faker.random_elements(
        elements=tags_list, unique=True, length=number_of_tags)
    for tag_label in tags:
        tag = Tag.objects.get(label=tag_label)
        TaggedItem.objects.create(
            tag=tag, content_type=content_type, object_id=content.id)
