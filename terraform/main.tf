provider "google" {
  project     = "devops-project-451319"
  region      = "europe-west10"
}

resource "google_storage_bucket" "terraform_state" {
  name          = "terraform-state-saving-1234"
  location      = "US"
  storage_class = "STANDARD"

  versioning {
    enabled = true
  }
}
resource "google_container_cluster" "primary" {
  provider = google
  name     = "gke-cluster"
  location = "europe-west10"

  node_pool {
    name = "default-pool"
    initial_node_count = 1

    autoscaling {
      total_min_node_count = 1
      total_max_node_count = 3
    }

    node_config {
      machine_type = "e2-medium"
      disk_type    = "pd-standard"
      disk_size_gb = 50
    }
  }

}
output "kubeconfig" {
  value = google_container_cluster.primary.endpoint
}
