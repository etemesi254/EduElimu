class UserAccountModel {
  int id = 0;
  String fullName;
  String dob;
  String firebaseUID;
  String phoneNumber;
  String email;
  String password;
  String? photoId;

  UserAccountModel({
     this.id=0,
    required this.phoneNumber,
    required this.dob,
    required this.firebaseUID,
    required this.fullName,
    required this.email,
    required this.password,
    required this.photoId,
  });

  Map<String, String> toMap() {
    return {
      "name": fullName,
      "phone_number": phoneNumber,
      "profile_image": photoId ?? "NONE",
      "DOB": dob,
      "email": email,
      "password": "NONE",
      "firebase_id": firebaseUID,
    };
  }

  factory UserAccountModel.fromJson(Map<String, dynamic> json) {
    return UserAccountModel(phoneNumber: json["phone_number"],
        dob: json["dob"],
        firebaseUID: json["firebase_id"],
        fullName: json["name"],
        email: json["email"],
        id:json["id"],
        photoId: json["profile_image"],
        password: "",
        );
  }
}
