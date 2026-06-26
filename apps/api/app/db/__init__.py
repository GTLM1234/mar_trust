"""Database configuration package.

Only infrastructure helpers belong here. Domain repositories should depend on a
SQLAlchemy Session, not on global engines, so tests can inject isolated sessions.
"""
