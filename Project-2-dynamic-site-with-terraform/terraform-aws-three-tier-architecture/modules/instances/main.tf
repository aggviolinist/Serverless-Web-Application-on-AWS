#eice
resource "aws_ec2_instance_connect_endpoint" "eice_connect_endpoint" {
  subnet_id          = var.private_subnets[1] #How to get the exact app subnet
  security_group_ids = [var.eice_sg_id]

  tags = {
    Name = "${var.project_name}-eice"
  }
}
# #ec2 instance
# resource "aws_instance" "data_migration_subnet" {

# }
