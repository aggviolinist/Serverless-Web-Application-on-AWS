# Main details
variable "project_name" {
  description = "Name of the project for resource tagging"
  type        = string
}

# Network
variable "vpc_cidr" {
  description = "VPC CIDR value"
  type        = string
}

#Instance_ami
variable "ami" {
  description = "Image for my instance"
  type        = string
}
#Instace_type
variable "instance_type" {
  description = "The Instance type gotten from root"
  type        = string
}
#Database Instance Class
variable "instance_class" {
  description = "The Database Instance class gotten from root"
  type        = string
}
