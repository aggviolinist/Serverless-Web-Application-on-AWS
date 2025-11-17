module "network" {
  source       = "./modules/network"
  project_name = var.project_name
  vpc_cidr     = var.vpc_cidr
}

module "security" {
  source = "./modules/security"

  project_name = var.project_name
  vpc_cidr     = var.vpc_cidr
  vpc_id       = module.network.vpc_id

}

module "instace" {
  source = "./modules/instances"

  project_name    = var.project_name
  private_subnets = module.network.private_subnets
  eice_sg_id      = module.security.eice_sg_id
}

module "storage" {
  source       = "./modules/storage"
  project_name = var.project_name
}