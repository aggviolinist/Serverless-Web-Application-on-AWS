# Main details
variable "project_name" {
  description = "Name of the project for resource tagging"
  type        = string
}

# private Subnets
variable "private_subnets" {
  description = "List of subnets from network module"
  type        = list(string)

}

# security groups
variable "eice_sg_id" {
  description = "Security group for the EC2 Instance Connection Endpoint"
  type        = string

}