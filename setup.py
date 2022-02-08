from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in crowdrun/__init__.py
from crowdrun import __version__ as version

setup(
	name="crowdrun",
	version=version,
	description="CrowdSourcing App",
	author="Samarth",
	author_email="samarth.upare@elastic.run",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
