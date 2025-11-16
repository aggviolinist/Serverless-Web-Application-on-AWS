module "network" {
  source       = "./modules/network"
  project_name = var.project_name
  vpc_cidr     = var.vpc_cidr
}

module "security" {
  source = "./modules/security"

  project_name = var.project_name
  vpc_cidr = var.vpc_cidr
}

module "instace" {
  source = "./modules/instances"
  project_name = var.project_name
  vpc_cidr = var.vpc_cidr
}

module "storage" {
  source = "./modules/storage"
  project_name = var.project_name
}