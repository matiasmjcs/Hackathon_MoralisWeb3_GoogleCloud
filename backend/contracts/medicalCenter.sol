// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
pragma experimental ABIEncoderV2;

contract medicalCenter {

     // struct to define the specialist
    struct specialist {
        string name;
        string specialty;
        uint pacientesSeen;
        address Address;
        string contact;
    }

    // event for new specialist
    event newSpecialist (
        string name,
        string specialty,
        uint pacientesSeen,
        address Address,
        string contact
    );

    // struct to define the patient
    struct patient {
        string name;
        address Address;
        bytes32[] careRecord;
    }

    // event for new patient
    event newPatient (
        string name,
        address Address
    );

    // event for signature patient
    event newSignature (
        bytes32 Id
    );

      // structure for defining medical care
    struct medicalAttention {
        address specialistDirection;
        address patientDirection;
        bytes32 IdMedicalAttention;
        string date;
        string Address;
        string typeOfAttention;
        string diagnostic;
        string observations;
        bool patientSignature;
    }

    // event for medical care
    event  newMedicalCare(
        address specialistDirection,
        address patientDirection,
        bytes32 IdMedicalAttention,
        string date,
        string Address,
        string typeOfAttention,
        string diagnostic,
        string observations,
        bool patientSignature
    );

    // mapping to see specialist
    mapping(address => specialist) public seeSpecialist;

    // mapping to see patient
    mapping(address => patient) public seePatient;

    // mapping to see medical attention
    mapping(bytes32 => medicalAttention) public seeMedicalAttention;

    // list to store the care record
    bytes32[] careRecord;

    // function to register specialist
    function registerSpecialist( string memory _name, string memory _specialty, string memory _contact ) public {
        //  struct specialist is assigned to mapping seeSpecialist
        seeSpecialist[msg.sender] = specialist(_name, _specialty, 0, msg.sender, _contact); 

        emit newSpecialist(_name, _specialty, 0, msg.sender, _contact );
    }

    // function to register patient
    function registerPatient(string memory _name) public {
        //  specialist structure is assigned to mapping seeSpecialist
        seePatient[msg.sender] = patient(_name, msg.sender, careRecord );

        emit newPatient(_name, msg.sender);
    }


    // function to generate medical care
    function medicalRecord( 
        address _patientDirection,
        string memory _date, 
        string memory _Address, 
        string memory _typeOfAttention, 
        string memory _diagnostic,
        string memory _observations
        ) public {    

    // ID is created with the delivered data 
    bytes32 _ID = keccak256(abi.encodePacked(_patientDirection, _typeOfAttention, _diagnostic, block.timestamp, msg.sender));   

    // ID is added to patient registration list
     patient storage _patient = seePatient[_patientDirection];
     _patient.careRecord.push(_ID);
     _patient = seePatient[_patientDirection];

     // the number of patients attended to is increased
     specialist storage _specialist = seeSpecialist[msg.sender];
      _specialist.pacientesSeen ++;
     _specialist = seeSpecialist[msg.sender];


    //  struct atencionMedica is assigned to mapping verAtencionMedica
    seeMedicalAttention[_ID] = medicalAttention( 
        msg.sender,
        _patientDirection, 
        _ID, 
        _date, 
        _Address,  
        _typeOfAttention, 
        _diagnostic, 
        _observations,
        false
        );

    // event per medical care
    emit newMedicalCare(
         msg.sender,
        _patientDirection, 
        _ID, 
        _date,  
        _Address,  
        _typeOfAttention, 
        _diagnostic,
        _observations, 
        false
    );

    }

    // function to return history of patient care history
    function returnCare(address _id) public view returns(bytes32[] memory ) {
     patient storage _patient = seePatient[_id];
     bytes32[] storage  _medicalHistory = _patient.careRecord;
     return _medicalHistory;
    }

    //  function to sign medical record
     function patientToSignature(bytes32 _ID) public {
     medicalAttention storage _medicalAttention = seeMedicalAttention[_ID];
     require(_medicalAttention.patientDirection == msg.sender);
     _medicalAttention.patientSignature = true;
     _medicalAttention = seeMedicalAttention[_ID];
     emit newSignature(_ID);
    }
}