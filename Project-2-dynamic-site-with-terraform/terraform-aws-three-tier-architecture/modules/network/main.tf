data "aws_availability_zones" "available" {
  state = "available"

  filter {
    name = "zone-type"
    values = ["availability-zone"]
  }
}

resource "aws_vpc" "three_tier_vpc" {
  cidr_block           = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
   Name = "${var.project_name}-vpc"
  }
}

resource "aws_subnet" "public_subnet" {
  count                   = 2
  vpc_id                  = aws_vpc.three_tier_vpc.id
  cidr_block              = cidrsubnet(var.vpc_cidr, 8, count.index)
  availability_zone       = element(data.aws_availability_zones.available.names, count.index % 2)
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.project_name}-public-subnet-${count.index + 1}"
  }
}

resource "aws_subnet" "private_subnet" {
  count             = 4
  vpc_id            = aws_vpc.three_tier_vpc.id
  cidr_block        = cidrsubnet(var.vpc_cidr, 8, count.index + 2)
  availability_zone = element(data.aws_availability_zones.available.names, count.index % 2)

  tags = {
    Name = "${var.project_name}-private-subnet-${count.index + 1}"
  }
}

