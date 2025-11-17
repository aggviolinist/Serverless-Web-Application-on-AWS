variable "project_name" {
  description = "Name of the project for resource tagging"
  type        = string
}
# private Subnets
variable "private_subnets" {
  description = "List of subnets from network module from module network"
  type        = list(string)
}
#DB Instance class
variable "instance_class" {
  description = "The Database Instance class gotten from root"
  type        = string
}
