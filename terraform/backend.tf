terraform {
  backend "gcs" {
    bucket  = "terraform-state-qwerty"
    prefix  = "state"

  }
}
