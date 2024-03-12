from django.db import models

from Skills.models import Skill,ExpertiseLevel 

class Project(models.Model):
    title = models.CharField(("title"), max_length=50)
    description = models.CharField(("description"), max_length=100)
    starting_date=models.DateField(("starting date"), auto_now=False, auto_now_add=False)
    deadline = models.DateField(("dead line"), auto_now=False, auto_now_add=False)

    def __str__(self) :
        return self.title
    
class Project_skill(models.Model):
    project=models.ForeignKey(Project, verbose_name=("project"), on_delete=models.CASCADE)
    skill=models.ForeignKey(Skill, verbose_name=("skill"), on_delete=models.CASCADE)
    expertiseLevel = models.CharField(
        max_length=2,
        choices=ExpertiseLevel.choices,
        default=ExpertiseLevel.BEGINNER,
    )
    class Meta:
        constraints=[
            models.UniqueConstraint(fields=['project','skill'],name="unique project skill")
        ]
    def __str__(self):
        return f"{self.project} proj"