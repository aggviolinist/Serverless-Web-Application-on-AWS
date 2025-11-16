resource "aws_ec2_instance_connect_endpoint" "eice_connect_endpoint" {
    vpc_id      = aws_vpc.three_tier_vpc.id
    subnet_id = aws_subnet.private_subnet[1].id #How to get the exact app subnet
    security_group_ids = [ aws_security_group.eice_ssh_sg.id ]

    tags = {
      Name = "${var.project_name}-eice"
    }
 
}