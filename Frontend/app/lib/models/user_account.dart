class UserAccountModel {
  String fullName;
  String dob;
  String firebaseUID;
  String phoneNumber;
  String email;

  UserAccountModel({
    required this.phoneNumber,
    required this.dob,
    required this.firebaseUID,
    required this.fullName,
    required this.email,
  });
}
