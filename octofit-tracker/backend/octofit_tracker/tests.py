from django.test import TestCase
from .models import User, Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
	def test_team_creation(self):
		team = Team.objects.create(name='TestTeam')
		self.assertEqual(str(team), 'TestTeam')

	def test_user_creation(self):
		user = User.objects.create(name='TestUser', email='test@example.com', team='TestTeam')
		self.assertEqual(str(user), 'TestUser')

	def test_activity_creation(self):
		activity = Activity.objects.create(user_email='test@example.com', type='Run', duration=10)
		self.assertEqual(str(activity), 'test@example.com - Run')

	def test_leaderboard_creation(self):
		lb = Leaderboard.objects.create(team='TestTeam', points=100)
		self.assertEqual(str(lb), 'TestTeam: 100')

	def test_workout_creation(self):
		workout = Workout.objects.create(name='Pushup', difficulty='Easy')
		self.assertEqual(str(workout), 'Pushup')
