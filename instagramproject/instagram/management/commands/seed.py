from uuid import uuid4

from django.core.management.base import BaseCommand
from django.utils import timezone

from faker import Faker

import random

from accounts.models import User
from crm.models import LeadStatus, Lead
from instagram.models import InstagramAccount, Post, Comment
from tasks.models import Todo
fake = Faker("ru_RU")


class Command(BaseCommand):
    help = "Fill database with fake data"

    def handle(self, *args, **kwargs):

        self.stdout.write("Cleaning database...")

        Todo.objects.all().delete()
        Lead.objects.all().delete()
        Comment.objects.all().delete()
        Post.objects.all().delete()
        InstagramAccount.objects.all().delete()

        User.objects.filter(is_superuser=False).delete()

        LeadStatus.objects.all().delete()

        self.stdout.write("Creating statuses...")

        statuses = []

        for order, name in enumerate(
            [
                "New",
                "Contacted",
                "Negotiation",
                "Contract",
                "Done",
            ],
            start=1,
        ):
            statuses.append(
                LeadStatus.objects.create(
                    name=name,
                    order=order,
                )
            )

        self.stdout.write("Creating managers...")

        managers = []

        for i in range(5):

            managers.append(
                User.objects.create_user(
                    username=f"manager{i+1}",
                    email=f"manager{i+1}@gmail.com",
                    password="12345678",
                    phone=f"+9989011122{i}",
                    role="manager",
                )
            )

        self.stdout.write("Creating Instagram account...")

        account = InstagramAccount.objects.create(
            username="my_instagram_shop",
            access_token="fake_access_token",
            refresh_token="fake_refresh_token",
        )

        captions = [
            "🔥 Новая коллекция",
            "❤️ Весенняя коллекция",
            "🎉 Большая скидка",
            "🚚 Бесплатная доставка",
            "⭐ Новинки магазина",
            "💥 Только сегодня",
            "🎁 Подарок каждому",
        ]

        posts = []

        self.stdout.write("Creating posts...")

        for i in range(10):

            posts.append(
                Post.objects.create(
                    account=account,
                    instagram_id=str(uuid4()),
                    image=f"https://picsum.photos/600/600?random={i}",
                    caption=random.choice(captions),
                    likes=random.randint(100, 5000),
                    comments_count=0,
                    created_at=fake.date_time_this_year(),
                )
            )

        comments_text = [
            "Здравствуйте! Сколько стоит?",
            "Есть доставка?",
            "Можно подробнее?",
            "Напишите в директ.",
            "Как оформить заказ?",
            "Есть другой цвет?",
            "Очень понравилось!",
            "Когда будет в наличии?",
            "Есть размеры?",
            "Можно заказать?",
            "Отправьте прайс.",
            "Цена?",
            "Есть скидка?",
            "Где находится магазин?",
            "Можно оплатить картой?",
        ]

        self.stdout.write("Creating comments, leads and tasks...")

        for i in range(60):

            comment = Comment.objects.create(
                post=random.choice(posts),
                instagram_comment_id=f"comment_{i}",
                username=fake.user_name(),
                text=random.choice(comments_text),
                is_replied=random.choice([True, False]),
                created_at=fake.date_time_this_year(),
            )

            lead = Lead.objects.create(
                manager=random.choice(managers),
                status=random.choice(statuses),
                comment=comment,
            )

            for _ in range(random.randint(1, 3)):

                Todo.objects.create(
                    lead=lead,
                    assigned_to=lead.manager,
                    title=random.choice(
                        [
                            "Позвонить клиенту",
                            "Отправить прайс",
                            "Ответить в Direct",
                            "Уточнить адрес",
                            "Проверить оплату",
                            "Подготовить договор",
                        ]
                    ),
                    description=fake.sentence(),
                    deadline=fake.future_datetime(),
                    status=random.choice(
                        [
                            "pending",
                            "completed",
                        ]
                    ),
                )
        for post in posts:
            post.comments_count = post.comments.count()
            post.save(update_fields=["comments_count"])
        self.stdout.write("")
        self.stdout.write(
            self.style.SUCCESS("====================================")
        )
        self.stdout.write(
            self.style.SUCCESS("Database successfully seeded!")
        )
        self.stdout.write(
            self.style.SUCCESS(f"Managers: {User.objects.count()}")
        )
        self.stdout.write(
            self.style.SUCCESS(f"Posts: {Post.objects.count()}")
        )
        self.stdout.write(
            self.style.SUCCESS(f"Comments: {Comment.objects.count()}")
        )
        self.stdout.write(
            self.style.SUCCESS(f"Leads: {Lead.objects.count()}")
        )
        self.stdout.write(
            self.style.SUCCESS(f"Todos: {Todo.objects.count()}")
        )
        self.stdout.write(
            self.style.SUCCESS("====================================")
        )