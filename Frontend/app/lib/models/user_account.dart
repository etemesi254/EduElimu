class UserAccountModel {
  String fullName;
  String dob;
  String firebaseUID;
  String phoneNumber;
  String email;
  String password;

  UserAccountModel({
    required this.phoneNumber,
    required this.dob,
    required this.firebaseUID,
    required this.fullName,
    required this.email,
    required this.password,
  });

  Map<String, String> toMap() {
    return {
      "name": fullName,
      "phone_number": phoneNumber,
      "profile_image": "TEMP",
      "DOB": dob,
      "email": email,
      "password": "NONE",
      "firebase_id": firebaseUID,
    };
  }
}
