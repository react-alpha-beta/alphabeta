export function zScoreByConfidenceInterval(confidenceInterval) {
  let zScore;
  if (confidenceInterval < 0.5000 || confidenceInterval > 0.9998) {
    const error = new Error('Your confidenceInterval must be between 0.5000 and 0.9998');
    throw error;
  } else if (confidenceInterval > 0.9997) {
    zScore = 3.49;
  } else if (confidenceInterval > 0.9996) {
    zScore = 3.39;
  } else if (confidenceInterval > 0.9995) {
    zScore = 3.33;
  } else if (confidenceInterval > 0.9994) {
    zScore = 3.27;
  } else if (confidenceInterval > 0.9993) {
    zScore = 3.22;
  } else if (confidenceInterval > 0.9992) {
    zScore = 3.18;
  } else if (confidenceInterval > 0.9991) {
    zScore = 3.14;
  } else if (confidenceInterval > 0.9990) {
    zScore = 3.11;
  } else if (confidenceInterval > 0.9989) {
    zScore = 3.08;
  } else if (confidenceInterval > 0.9988) {
    zScore = 3.05;
  } else if (confidenceInterval > 0.9987) {
    zScore = 3.03;
  } else if (confidenceInterval > 0.9986) {
    zScore = 3.00;
  } else if (confidenceInterval > 0.9985) {
    zScore = 2.98;
  } else if (confidenceInterval > 0.9984) {
    zScore = 2.96;
  } else if (confidenceInterval > 0.9983) {
    zScore = 2.94;
  } else if (confidenceInterval > 0.9982) {
    zScore = 2.93;
  } else if (confidenceInterval > 0.9981) {
    zScore = 2.91;
  } else if (confidenceInterval > 0.9980) {
    zScore = 2.89;
  } else if (confidenceInterval > 0.9979) {
    zScore = 2.88;
  } else if (confidenceInterval > 0.9978) {
    zScore = 2.86;
  } else if (confidenceInterval > 0.9977) {
    zScore = 2.85;
  } else if (confidenceInterval > 0.9976) {
    zScore = 2.83;
  } else if (confidenceInterval > 0.9975) {
    zScore = 2.82;
  } else if (confidenceInterval > 0.9974) {
    zScore = 2.81;
  } else if (confidenceInterval > 0.9973) {
    zScore = 2.79;
  } else if (confidenceInterval > 0.9972) {
    zScore = 2.78;
  } else if (confidenceInterval > 0.9971) {
    zScore = 2.77;
  } else if (confidenceInterval > 0.9970) {
    zScore = 2.76;
  } else if (confidenceInterval > 0.9969) {
    zScore = 2.75;
  } else if (confidenceInterval > 0.9968) {
    zScore = 2.74;
  } else if (confidenceInterval > 0.9967) {
    zScore = 2.73;
  } else if (confidenceInterval > 0.9966) {
    zScore = 2.72;
  } else if (confidenceInterval > 0.9965) {
    zScore = 2.71;
  } else if (confidenceInterval > 0.9964) {
    zScore = 2.70;
  } else if (confidenceInterval > 0.9963) {
    zScore = 2.69;
  } else if (confidenceInterval > 0.9962) {
    zScore = 2.68;
  } else if (confidenceInterval > 0.9961) {
    zScore = 2.67;
  } else if (confidenceInterval > 0.9960) {
    zScore = 2.66;
  } else if (confidenceInterval > 0.9959) {
    zScore = 2.65;
  } else if (confidenceInterval > 0.9957) {
    zScore = 2.64;
  } else if (confidenceInterval > 0.9956) {
    zScore = 2.63;
  } else if (confidenceInterval > 0.9955) {
    zScore = 2.62;
  } else if (confidenceInterval > 0.9953) {
    zScore = 2.61;
  } else if (confidenceInterval > 0.9952) {
    zScore = 2.60;
  } else if (confidenceInterval > 0.9951) {
    zScore = 2.59;
  } else if (confidenceInterval > 0.9949) {
    zScore = 2.58;
  } else if (confidenceInterval > 0.9948) {
    zScore = 2.57;
  } else if (confidenceInterval > 0.9946) {
    zScore = 2.56;
  } else if (confidenceInterval > 0.9945) {
    zScore = 2.55;
  } else if (confidenceInterval > 0.9943) {
    zScore = 2.54;
  } else if (confidenceInterval > 0.9941) {
    zScore = 2.53;
  } else if (confidenceInterval > 0.9940) {
    zScore = 2.52;
  } else if (confidenceInterval > 0.9938) {
    zScore = 2.51;
  } else if (confidenceInterval > 0.9936) {
    zScore = 2.50;
  } else if (confidenceInterval > 0.9934) {
    zScore = 2.49;
  } else if (confidenceInterval > 0.9932) {
    zScore = 2.48;
  } else if (confidenceInterval > 0.9931) {
    zScore = 2.47;
  } else if (confidenceInterval > 0.9929) {
    zScore = 2.46;
  } else if (confidenceInterval > 0.9927) {
    zScore = 2.45;
  } else if (confidenceInterval > 0.9925) {
    zScore = 2.44;
  } else if (confidenceInterval > 0.9922) {
    zScore = 2.43;
  } else if (confidenceInterval > 0.9920) {
    zScore = 2.42;
  } else if (confidenceInterval > 0.9918) {
    zScore = 2.41;
  } else if (confidenceInterval > 0.9916) {
    zScore = 2.40;
  } else if (confidenceInterval > 0.9913) {
    zScore = 2.39;
  } else if (confidenceInterval > 0.9911) {
    zScore = 2.38;
  } else if (confidenceInterval > 0.9909) {
    zScore = 2.37;
  } else if (confidenceInterval > 0.9906) {
    zScore = 2.36;
  } else if (confidenceInterval > 0.9904) {
    zScore = 2.35;
  } else if (confidenceInterval > 0.9901) {
    zScore = 2.34;
  } else if (confidenceInterval > 0.9898) {
    zScore = 2.33;
  } else if (confidenceInterval > 0.9896) {
    zScore = 2.32;
  } else if (confidenceInterval > 0.9893) {
    zScore = 2.31;
  } else if (confidenceInterval > 0.9890) {
    zScore = 2.30;
  } else if (confidenceInterval > 0.9887) {
    zScore = 2.29;
  } else if (confidenceInterval > 0.9884) {
    zScore = 2.28;
  } else if (confidenceInterval > 0.9881) {
    zScore = 2.27;
  } else if (confidenceInterval > 0.9878) {
    zScore = 2.26;
  } else if (confidenceInterval > 0.9875) {
    zScore = 2.25;
  } else if (confidenceInterval > 0.9871) {
    zScore = 2.24;
  } else if (confidenceInterval > 0.9868) {
    zScore = 2.23;
  } else if (confidenceInterval > 0.9864) {
    zScore = 2.22;
  } else if (confidenceInterval > 0.9861) {
    zScore = 2.21;
  } else if (confidenceInterval > 0.9857) {
    zScore = 2.20;
  } else if (confidenceInterval > 0.9854) {
    zScore = 2.19;
  } else if (confidenceInterval > 0.9850) {
    zScore = 2.18;
  } else if (confidenceInterval > 0.9846) {
    zScore = 2.17;
  } else if (confidenceInterval > 0.9842) {
    zScore = 2.16;
  } else if (confidenceInterval > 0.9838) {
    zScore = 2.15;
  } else if (confidenceInterval > 0.9834) {
    zScore = 2.14;
  } else if (confidenceInterval > 0.9830) {
    zScore = 2.13;
  } else if (confidenceInterval > 0.9826) {
    zScore = 2.12;
  } else if (confidenceInterval > 0.9821) {
    zScore = 2.11;
  } else if (confidenceInterval > 0.9817) {
    zScore = 2.10;
  } else if (confidenceInterval > 0.9812) {
    zScore = 2.09;
  } else if (confidenceInterval > 0.9808) {
    zScore = 2.08;
  } else if (confidenceInterval > 0.9803) {
    zScore = 2.07;
  } else if (confidenceInterval > 0.9798) {
    zScore = 2.06;
  } else if (confidenceInterval > 0.9793) {
    zScore = 2.05;
  } else if (confidenceInterval > 0.9788) {
    zScore = 2.04;
  } else if (confidenceInterval > 0.9783) {
    zScore = 2.03;
  } else if (confidenceInterval > 0.9778) {
    zScore = 2.02;
  } else if (confidenceInterval > 0.9772) {
    zScore = 2.01;
  } else if (confidenceInterval > 0.9767) {
    zScore = 2.00;
  } else if (confidenceInterval > 0.9761) {
    zScore = 1.99;
  } else if (confidenceInterval > 0.9756) {
    zScore = 1.98;
  } else if (confidenceInterval > 0.9750) {
    zScore = 1.97;
  } else if (confidenceInterval > 0.9744) {
    zScore = 1.96;
  } else if (confidenceInterval > 0.9738) {
    zScore = 1.95;
  } else if (confidenceInterval > 0.9732) {
    zScore = 1.94;
  } else if (confidenceInterval > 0.9726) {
    zScore = 1.93;
  } else if (confidenceInterval > 0.9719) {
    zScore = 1.92;
  } else if (confidenceInterval > 0.9713) {
    zScore = 1.91;
  } else if (confidenceInterval > 0.9706) {
    zScore = 1.90;
  } else if (confidenceInterval > 0.9699) {
    zScore = 1.89;
  } else if (confidenceInterval > 0.9693) {
    zScore = 1.88;
  } else if (confidenceInterval > 0.9686) {
    zScore = 1.87;
  } else if (confidenceInterval > 0.9678) {
    zScore = 1.86;
  } else if (confidenceInterval > 0.9671) {
    zScore = 1.85;
  } else if (confidenceInterval > 0.9664) {
    zScore = 1.84;
  } else if (confidenceInterval > 0.9656) {
    zScore = 1.83;
  } else if (confidenceInterval > 0.9649) {
    zScore = 1.82;
  } else if (confidenceInterval > 0.9641) {
    zScore = 1.81;
  } else if (confidenceInterval > 0.9633) {
    zScore = 1.80;
  } else if (confidenceInterval > 0.9625) {
    zScore = 1.79;
  } else if (confidenceInterval > 0.9616) {
    zScore = 1.78;
  } else if (confidenceInterval > 0.9608) {
    zScore = 1.77;
  } else if (confidenceInterval > 0.9599) {
    zScore = 1.76;
  } else if (confidenceInterval > 0.9591) {
    zScore = 1.75;
  } else if (confidenceInterval > 0.9582) {
    zScore = 1.74;
  } else if (confidenceInterval > 0.9573) {
    zScore = 1.73;
  } else if (confidenceInterval > 0.9564) {
    zScore = 1.72;
  } else if (confidenceInterval > 0.9554) {
    zScore = 1.71;
  } else if (confidenceInterval > 0.9545) {
    zScore = 1.70;
  } else if (confidenceInterval > 0.9535) {
    zScore = 1.69;
  } else if (confidenceInterval > 0.9525) {
    zScore = 1.68;
  } else if (confidenceInterval > 0.9515) {
    zScore = 1.67;
  } else if (confidenceInterval > 0.9505) {
    zScore = 1.66;
  } else if (confidenceInterval > 0.9495) {
    zScore = 1.65;
  } else if (confidenceInterval > 0.9484) {
    zScore = 1.64;
  } else if (confidenceInterval > 0.9474) {
    zScore = 1.63;
  } else if (confidenceInterval > 0.9463) {
    zScore = 1.62;
  } else if (confidenceInterval > 0.9452) {
    zScore = 1.61;
  } else if (confidenceInterval > 0.9441) {
    zScore = 1.60;
  } else if (confidenceInterval > 0.9429) {
    zScore = 1.59;
  } else if (confidenceInterval > 0.9418) {
    zScore = 1.58;
  } else if (confidenceInterval > 0.9406) {
    zScore = 1.57;
  } else if (confidenceInterval > 0.9394) {
    zScore = 1.56;
  } else if (confidenceInterval > 0.9382) {
    zScore = 1.55;
  } else if (confidenceInterval > 0.9370) {
    zScore = 1.54;
  } else if (confidenceInterval > 0.9357) {
    zScore = 1.53;
  } else if (confidenceInterval > 0.9345) {
    zScore = 1.52;
  } else if (confidenceInterval > 0.9332) {
    zScore = 1.51;
  } else if (confidenceInterval > 0.9319) {
    zScore = 1.50;
  } else if (confidenceInterval > 0.9306) {
    zScore = 1.49;
  } else if (confidenceInterval > 0.9292) {
    zScore = 1.48;
  } else if (confidenceInterval > 0.9279) {
    zScore = 1.47;
  } else if (confidenceInterval > 0.9265) {
    zScore = 1.46;
  } else if (confidenceInterval > 0.9251) {
    zScore = 1.45;
  } else if (confidenceInterval > 0.9236) {
    zScore = 1.44;
  } else if (confidenceInterval > 0.9222) {
    zScore = 1.43;
  } else if (confidenceInterval > 0.9207) {
    zScore = 1.42;
  } else if (confidenceInterval > 0.9192) {
    zScore = 1.41;
  } else if (confidenceInterval > 0.9177) {
    zScore = 1.40;
  } else if (confidenceInterval > 0.9162) {
    zScore = 1.39;
  } else if (confidenceInterval > 0.9147) {
    zScore = 1.38;
  } else if (confidenceInterval > 0.9131) {
    zScore = 1.37;
  } else if (confidenceInterval > 0.9115) {
    zScore = 1.36;
  } else if (confidenceInterval > 0.9099) {
    zScore = 1.35;
  } else if (confidenceInterval > 0.9082) {
    zScore = 1.34;
  } else if (confidenceInterval > 0.9066) {
    zScore = 1.33;
  } else if (confidenceInterval > 0.9049) {
    zScore = 1.32;
  } else if (confidenceInterval > 0.9032) {
    zScore = 1.31;
  } else if (confidenceInterval > 0.9015) {
    zScore = 1.30;
  } else if (confidenceInterval > 0.8997) {
    zScore = 1.29;
  } else if (confidenceInterval > 0.8980) {
    zScore = 1.28;
  } else if (confidenceInterval > 0.8962) {
    zScore = 1.27;
  } else if (confidenceInterval > 0.8944) {
    zScore = 1.26;
  } else if (confidenceInterval > 0.8925) {
    zScore = 1.25;
  } else if (confidenceInterval > 0.8907) {
    zScore = 1.24;
  } else if (confidenceInterval > 0.8888) {
    zScore = 1.23;
  } else if (confidenceInterval > 0.8869) {
    zScore = 1.22;
  } else if (confidenceInterval > 0.8849) {
    zScore = 1.21;
  } else if (confidenceInterval > 0.8830) {
    zScore = 1.20;
  } else if (confidenceInterval > 0.8810) {
    zScore = 1.19;
  } else if (confidenceInterval > 0.8790) {
    zScore = 1.18;
  } else if (confidenceInterval > 0.8770) {
    zScore = 1.17;
  } else if (confidenceInterval > 0.8749) {
    zScore = 1.16;
  } else if (confidenceInterval > 0.8729) {
    zScore = 1.15;
  } else if (confidenceInterval > 0.8708) {
    zScore = 1.14;
  } else if (confidenceInterval > 0.8686) {
    zScore = 1.13;
  } else if (confidenceInterval > 0.8665) {
    zScore = 1.12;
  } else if (confidenceInterval > 0.8643) {
    zScore = 1.11;
  } else if (confidenceInterval > 0.8621) {
    zScore = 1.10;
  } else if (confidenceInterval > 0.8599) {
    zScore = 1.09;
  } else if (confidenceInterval > 0.8577) {
    zScore = 1.08;
  } else if (confidenceInterval > 0.8554) {
    zScore = 1.07;
  } else if (confidenceInterval > 0.8531) {
    zScore = 1.06;
  } else if (confidenceInterval > 0.8508) {
    zScore = 1.05;
  } else if (confidenceInterval > 0.8485) {
    zScore = 1.04;
  } else if (confidenceInterval > 0.8461) {
    zScore = 1.03;
  } else if (confidenceInterval > 0.8438) {
    zScore = 1.02;
  } else if (confidenceInterval > 0.8413) {
    zScore = 1.01;
  } else if (confidenceInterval > 0.8389) {
    zScore = 1.00;
  } else if (confidenceInterval > 0.8365) {
    zScore = 0.99;
  } else if (confidenceInterval > 0.8340) {
    zScore = 0.98;
  } else if (confidenceInterval > 0.8315) {
    zScore = 0.97;
  } else if (confidenceInterval > 0.8289) {
    zScore = 0.96;
  } else if (confidenceInterval > 0.8264) {
    zScore = 0.95;
  } else if (confidenceInterval > 0.8238) {
    zScore = 0.94;
  } else if (confidenceInterval > 0.8212) {
    zScore = 0.93;
  } else if (confidenceInterval > 0.8186) {
    zScore = 0.92;
  } else if (confidenceInterval > 0.8159) {
    zScore = 0.91;
  } else if (confidenceInterval > 0.8133) {
    zScore = 0.90;
  } else if (confidenceInterval > 0.8106) {
    zScore = 0.89;
  } else if (confidenceInterval > 0.8078) {
    zScore = 0.88;
  } else if (confidenceInterval > 0.8051) {
    zScore = 0.87;
  } else if (confidenceInterval > 0.8023) {
    zScore = 0.86;
  } else if (confidenceInterval > 0.7995) {
    zScore = 0.85;
  } else if (confidenceInterval > 0.7967) {
    zScore = 0.84;
  } else if (confidenceInterval > 0.7939) {
    zScore = 0.83;
  } else if (confidenceInterval > 0.7910) {
    zScore = 0.82;
  } else if (confidenceInterval > 0.7881) {
    zScore = 0.81;
  } else if (confidenceInterval > 0.7852) {
    zScore = 0.80;
  } else if (confidenceInterval > 0.7823) {
    zScore = 0.79;
  } else if (confidenceInterval > 0.7794) {
    zScore = 0.78;
  } else if (confidenceInterval > 0.7764) {
    zScore = 0.77;
  } else if (confidenceInterval > 0.7734) {
    zScore = 0.76;
  } else if (confidenceInterval > 0.7704) {
    zScore = 0.75;
  } else if (confidenceInterval > 0.7673) {
    zScore = 0.74;
  } else if (confidenceInterval > 0.7642) {
    zScore = 0.73;
  } else if (confidenceInterval > 0.7611) {
    zScore = 0.72;
  } else if (confidenceInterval > 0.7580) {
    zScore = 0.71;
  } else if (confidenceInterval > 0.7549) {
    zScore = 0.70;
  } else if (confidenceInterval > 0.7517) {
    zScore = 0.69;
  } else if (confidenceInterval > 0.7486) {
    zScore = 0.68;
  } else if (confidenceInterval > 0.7454) {
    zScore = 0.67;
  } else if (confidenceInterval > 0.7422) {
    zScore = 0.66;
  } else if (confidenceInterval > 0.7389) {
    zScore = 0.65;
  } else if (confidenceInterval > 0.7357) {
    zScore = 0.64;
  } else if (confidenceInterval > 0.7324) {
    zScore = 0.63;
  } else if (confidenceInterval > 0.7291) {
    zScore = 0.62;
  } else if (confidenceInterval > 0.7257) {
    zScore = 0.61;
  } else if (confidenceInterval > 0.7224) {
    zScore = 0.60;
  } else if (confidenceInterval > 0.7190) {
    zScore = 0.59;
  } else if (confidenceInterval > 0.7157) {
    zScore = 0.58;
  } else if (confidenceInterval > 0.7123) {
    zScore = 0.57;
  } else if (confidenceInterval > 0.7088) {
    zScore = 0.56;
  } else if (confidenceInterval > 0.7054) {
    zScore = 0.55;
  } else if (confidenceInterval > 0.7019) {
    zScore = 0.54;
  } else if (confidenceInterval > 0.6985) {
    zScore = 0.53;
  } else if (confidenceInterval > 0.6950) {
    zScore = 0.52;
  } else if (confidenceInterval > 0.6915) {
    zScore = 0.51;
  } else if (confidenceInterval > 0.6879) {
    zScore = 0.50;
  } else if (confidenceInterval > 0.6844) {
    zScore = 0.49;
  } else if (confidenceInterval > 0.6808) {
    zScore = 0.48;
  } else if (confidenceInterval > 0.6772) {
    zScore = 0.47;
  } else if (confidenceInterval > 0.6736) {
    zScore = 0.46;
  } else if (confidenceInterval > 0.6700) {
    zScore = 0.45;
  } else if (confidenceInterval > 0.6664) {
    zScore = 0.44;
  } else if (confidenceInterval > 0.6628) {
    zScore = 0.43;
  } else if (confidenceInterval > 0.6591) {
    zScore = 0.42;
  } else if (confidenceInterval > 0.6554) {
    zScore = 0.41;
  } else if (confidenceInterval > 0.6517) {
    zScore = 0.40;
  } else if (confidenceInterval > 0.6480) {
    zScore = 0.39;
  } else if (confidenceInterval > 0.6443) {
    zScore = 0.38;
  } else if (confidenceInterval > 0.6406) {
    zScore = 0.37;
  } else if (confidenceInterval > 0.6368) {
    zScore = 0.36;
  } else if (confidenceInterval > 0.6331) {
    zScore = 0.35;
  } else if (confidenceInterval > 0.6293) {
    zScore = 0.34;
  } else if (confidenceInterval > 0.6255) {
    zScore = 0.33;
  } else if (confidenceInterval > 0.6217) {
    zScore = 0.32;
  } else if (confidenceInterval > 0.6179) {
    zScore = 0.31;
  } else if (confidenceInterval > 0.6141) {
    zScore = 0.30;
  } else if (confidenceInterval > 0.6103) {
    zScore = 0.29;
  } else if (confidenceInterval > 0.6064) {
    zScore = 0.28;
  } else if (confidenceInterval > 0.6026) {
    zScore = 0.27;
  } else if (confidenceInterval > 0.5987) {
    zScore = 0.26;
  } else if (confidenceInterval > 0.5948) {
    zScore = 0.25;
  } else if (confidenceInterval > 0.5910) {
    zScore = 0.24;
  } else if (confidenceInterval > 0.5871) {
    zScore = 0.23;
  } else if (confidenceInterval > 0.5832) {
    zScore = 0.22;
  } else if (confidenceInterval > 0.5793) {
    zScore = 0.21;
  } else if (confidenceInterval > 0.5753) {
    zScore = 0.20;
  } else if (confidenceInterval > 0.5714) {
    zScore = 0.19;
  } else if (confidenceInterval > 0.5675) {
    zScore = 0.18;
  } else if (confidenceInterval > 0.5636) {
    zScore = 0.17;
  } else if (confidenceInterval > 0.5596) {
    zScore = 0.16;
  } else if (confidenceInterval > 0.5557) {
    zScore = 0.15;
  } else if (confidenceInterval > 0.5517) {
    zScore = 0.14;
  } else if (confidenceInterval > 0.5478) {
    zScore = 0.13;
  } else if (confidenceInterval > 0.5438) {
    zScore = 0.12;
  } else if (confidenceInterval > 0.5398) {
    zScore = 0.11;
  } else if (confidenceInterval > 0.5359) {
    zScore = 0.10;
  } else if (confidenceInterval > 0.5319) {
    zScore = 0.09;
  } else if (confidenceInterval > 0.5279) {
    zScore = 0.08;
  } else if (confidenceInterval > 0.5239) {
    zScore = 0.07;
  } else if (confidenceInterval > 0.5199) {
    zScore = 0.06;
  } else if (confidenceInterval > 0.5160) {
    zScore = 0.05;
  } else if (confidenceInterval > 0.5120) {
    zScore = 0.04;
  } else if (confidenceInterval > 0.5080) {
    zScore = 0.03;
  } else if (confidenceInterval > 0.5040) {
    zScore = 0.02;
  } else if (confidenceInterval > 0.5000) {
    zScore = 0.01;
  } else {
    zScore = 0.00;
  }
  return zScore;
}


// export const zTable = [
//   [-3.49, 0.0002],
//   [-3.48, 0.0003],
//   [-3.47, 0.0003],
//   [-3.46, 0.0003],
//   [-3.45, 0.0003],
//   [-3.44, 0.0003],
//   [-3.43, 0.0003],
//   [-3.42, 0.0003],
//   [-3.41, 0.0003],
//   [-3.40, 0.0003],

//   [-3.39, 0.0003],
//   [-3.38, 0.0004],
//   [-3.37, 0.0004],
//   [-3.36, 0.0004],
//   [-3.35, 0.0004],
//   [-3.34, 0.0004],
//   [-3.33, 0.0004],
//   [-3.32, 0.0005],
//   [-3.31, 0.0005],
//   [-3.30, 0.0005],

//   [-3.29, 0.0005],
//   [-3.28, 0.0005],
//   [-3.27, 0.0005],
//   [-3.26, 0.0006],
//   [-3.25, 0.0006],
//   [-3.24, 0.0006],
//   [-3.23, 0.0006],
//   [-3.22, 0.0006],
//   [-3.21, 0.0007],
//   [-3.20, 0.0007],

//   [-3.19, 0.0007],
//   [-3.18, 0.0007],
//   [-3.17, 0.0008],
//   [-3.16, 0.0008],
//   [-3.15, 0.0008],
//   [-3.14, 0.0008],
//   [-3.13, 0.0009],
//   [-3.12, 0.0009],
//   [-3.11, 0.0009],
//   [-3.10, 0.0010],

//   [-3.09, 0.0010],
//   [-3.08, 0.0010],
//   [-3.07, 0.0011],
//   [-3.06, 0.0011],
//   [-3.05, 0.0011],
//   [-3.04, 0.0012],
//   [-3.03, 0.0012],
//   [-3.02, 0.0013],
//   [-3.01, 0.0013],
//   [-3.00, 0.0013],

//   [-2.99, 0.0014],
//   [-2.98, 0.0014],
//   [-2.97, 0.0015],
//   [-2.96, 0.0015],
//   [-2.95, 0.0016],
//   [-2.94, 0.0016],
//   [-2.93, 0.0017],
//   [-2.92, 0.0018],
//   [-2.91, 0.0018],
//   [-2.90, 0.0019],

//   [-2.89, 0.0019],
//   [-2.88, 0.0020],
//   [-2.87, 0.0021],
//   [-2.86, 0.0021],
//   [-2.85, 0.0022],
//   [-2.84, 0.0023],
//   [-2.83, 0.0023],
//   [-2.82, 0.0024],
//   [-2.81, 0.0025],
//   [-2.80, 0.0026],

//   [-2.79, 0.0026],
//   [-2.78, 0.0027],
//   [-2.77, 0.0028],
//   [-2.76, 0.0029],
//   [-2.75, 0.0030],
//   [-2.74, 0.0031],
//   [-2.73, 0.0032],
//   [-2.72, 0.0033],
//   [-2.71, 0.0034],
//   [-2.70, 0.0035],

//   [-2.69, 0.0036],
//   [-2.68, 0.0037],
//   [-2.67, 0.0038],
//   [-2.66, 0.0039],
//   [-2.65, 0.0040],
//   [-2.64, 0.0041],
//   [-2.63, 0.0043],
//   [-2.62, 0.0044],
//   [-2.61, 0.0045],
//   [-2.60, 0.0047],

//   [-2.59, 0.0048],
//   [-2.58, 0.0049],
//   [-2.57, 0.0051],
//   [-2.56, 0.0052],
//   [-2.55, 0.0054],
//   [-2.54, 0.0055],
//   [-2.53, 0.0057],
//   [-2.52, 0.0059],
//   [-2.51, 0.0060],
//   [-2.50, 0.0062],

//   [-2.49, 0.0064],
//   [-2.48, 0.0066],
//   [-2.47, 0.0068],
//   [-2.46, 0.0069],
//   [-2.45, 0.0071],
//   [-2.44, 0.0073],
//   [-2.43, 0.0075],
//   [-2.42, 0.0078],
//   [-2.41, 0.0080],
//   [-2.40, 0.0082],

//   [-2.39, 0.0084],
//   [-2.38, 0.0087],
//   [-2.37, 0.0089],
//   [-2.36, 0.0091],
//   [-2.35, 0.0094],
//   [-2.34, 0.0096],
//   [-2.33, 0.0099],
//   [-2.32, 0.0102],
//   [-2.31, 0.0104],
//   [-2.30, 0.0107],

//   [-2.29, 0.0110],
//   [-2.28, 0.0113],
//   [-2.27, 0.0116],
//   [-2.26, 0.0119],
//   [-2.25, 0.0122],
//   [-2.24, 0.0125],
//   [-2.23, 0.0129],
//   [-2.22, 0.0132],
//   [-2.21, 0.0136],
//   [-2.20, 0.0139],

//   [-2.19, 0.0143],
//   [-2.18, 0.0146],
//   [-2.17, 0.0150],
//   [-2.16, 0.0154],
//   [-2.15, 0.0158],
//   [-2.14, 0.0162],
//   [-2.13, 0.0166],
//   [-2.12, 0.0170],
//   [-2.11, 0.0174],
//   [-2.10, 0.0179],

//   [-2.09, 0.0183],
//   [-2.08, 0.0188],
//   [-2.07, 0.0192],
//   [-2.06, 0.0197],
//   [-2.05, 0.0202],
//   [-2.04, 0.0207],
//   [-2.03, 0.0212],
//   [-2.02, 0.0217],
//   [-2.01, 0.0222],
//   [-2.00, 0.0228],

//   [-1.99, 0.0233],
//   [-1.98, 0.0239],
//   [-1.97, 0.0244],
//   [-1.96, 0.0250],
//   [-1.95, 0.0256],
//   [-1.94, 0.0262],
//   [-1.93, 0.0268],
//   [-1.92, 0.0274],
//   [-1.91, 0.0281],
//   [-1.90, 0.0287],

//   [-1.89, 0.0294],
//   [-1.88, 0.0301],
//   [-1.87, 0.0307],
//   [-1.86, 0.0314],
//   [-1.85, 0.0322],
//   [-1.84, 0.0329],
//   [-1.83, 0.0336],
//   [-1.82, 0.0344],
//   [-1.81, 0.0351],
//   [-1.80, 0.0359],

//   [-1.79, 0.0367],
//   [-1.78, 0.0375],
//   [-1.77, 0.0384],
//   [-1.76, 0.0392],
//   [-1.75, 0.0401],
//   [-1.74, 0.0409],
//   [-1.73, 0.0418],
//   [-1.72, 0.0427],
//   [-1.71, 0.0436],
//   [-1.70, 0.0446],

//   [-1.69, 0.0455],
//   [-1.68, 0.0465],
//   [-1.67, 0.0475],
//   [-1.66, 0.0485],
//   [-1.65, 0.0495],
//   [-1.64, 0.0505],
//   [-1.63, 0.0516],
//   [-1.62, 0.0526],
//   [-1.61, 0.0537],
//   [-1.60, 0.0548],

//   [-1.59, 0.0559],
//   [-1.58, 0.0571],
//   [-1.57, 0.0582],
//   [-1.56, 0.0594],
//   [-1.55, 0.0606],
//   [-1.54, 0.0618],
//   [-1.53, 0.0630],
//   [-1.52, 0.0643],
//   [-1.51, 0.0655],
//   [-1.50, 0.0668],

//   [-1.49, 0.0681],
//   [-1.48, 0.0694],
//   [-1.47, 0.0708],
//   [-1.46, 0.0721],
//   [-1.45, 0.0735],
//   [-1.44, 0.0749],
//   [-1.43, 0.0764],
//   [-1.42, 0.0778],
//   [-1.41, 0.0793],
//   [-1.40, 0.0808],

//   [-1.39, 0.0823],
//   [-1.38, 0.0838],
//   [-1.37, 0.0853],
//   [-1.36, 0.0869],
//   [-1.35, 0.0885],
//   [-1.34, 0.0901],
//   [-1.33, 0.0918],
//   [-1.32, 0.0934],
//   [-1.31, 0.0951],
//   [-1.30, 0.0968],

//   [-1.29, 0.0985],
//   [-1.28, 0.1003],
//   [-1.27, 0.1020],
//   [-1.26, 0.1038],
//   [-1.25, 0.1056],
//   [-1.24, 0.1075],
//   [-1.23, 0.1093],
//   [-1.22, 0.1112],
//   [-1.21, 0.1131],
//   [-1.20, 0.1151],

//   [-1.19, 0.1170],
//   [-1.18, 0.1190],
//   [-1.17, 0.1210],
//   [-1.16, 0.1230],
//   [-1.15, 0.1251],
//   [-1.14, 0.1271],
//   [-1.13, 0.1292],
//   [-1.12, 0.1314],
//   [-1.11, 0.1335],
//   [-1.10, 0.1357],

//   [-1.09, 0.1379],
//   [-1.08, 0.1401],
//   [-1.07, 0.1423],
//   [-1.06, 0.1446],
//   [-1.05, 0.1469],
//   [-1.04, 0.1492],
//   [-1.03, 0.1515],
//   [-1.02, 0.1539],
//   [-1.01, 0.1562],
//   [-1.00, 0.1587],

//   [-0.99, 0.1611],
//   [-0.98, 0.1635],
//   [-0.97, 0.1660],
//   [-0.96, 0.1685],
//   [-0.95, 0.1711],
//   [-0.94, 0.1736],
//   [-0.93, 0.1762],
//   [-0.92, 0.1788],
//   [-0.91, 0.1814],
//   [-0.90, 0.1841],

//   [-0.89, 0.1867],
//   [-0.88, 0.1894],
//   [-0.87, 0.1922],
//   [-0.86, 0.1949],
//   [-0.85, 0.1977],
//   [-0.84, 0.2005],
//   [-0.83, 0.2033],
//   [-0.82, 0.2061],
//   [-0.81, 0.2090],
//   [-0.80, 0.2119],

//   [-0.79, 0.2148],
//   [-0.78, 0.2177],
//   [-0.77, 0.2206],
//   [-0.76, 0.2236],
//   [-0.75, 0.2266],
//   [-0.74, 0.2296],
//   [-0.73, 0.2327],
//   [-0.72, 0.2358],
//   [-0.71, 0.2389],
//   [-0.70, 0.2420],

//   [-0.69, 0.2451],
//   [-0.68, 0.2483],
//   [-0.67, 0.2514],
//   [-0.66, 0.2546],
//   [-0.65, 0.2578],
//   [-0.64, 0.2611],
//   [-0.63, 0.2643],
//   [-0.62, 0.2676],
//   [-0.61, 0.2709],
//   [-0.60, 0.2743],

//   [-0.59, 0.2776],
//   [-0.58, 0.2810],
//   [-0.57, 0.2843],
//   [-0.56, 0.2877],
//   [-0.55, 0.2912],
//   [-0.54, 0.2946],
//   [-0.53, 0.2981],
//   [-0.52, 0.3015],
//   [-0.51, 0.3050],
//   [-0.50, 0.3085],

//   [-0.49, 0.3121],
//   [-0.48, 0.3156],
//   [-0.47, 0.3192],
//   [-0.46, 0.3228],
//   [-0.45, 0.3264],
//   [-0.44, 0.3300],
//   [-0.43, 0.3336],
//   [-0.42, 0.3372],
//   [-0.41, 0.3409],
//   [-0.40, 0.3446],

//   [-0.39, 0.3483],
//   [-0.38, 0.3520],
//   [-0.37, 0.3557],
//   [-0.36, 0.3594],
//   [-0.35, 0.3632],
//   [-0.34, 0.3669],
//   [-0.33, 0.3707],
//   [-0.32, 0.3745],
//   [-0.31, 0.3783],
//   [-0.30, 0.3821],

//   [-0.29, 0.3859],
//   [-0.28, 0.3897],
//   [-0.27, 0.3936],
//   [-0.26, 0.3974],
//   [-0.25, 0.4013],
//   [-0.24, 0.4052],
//   [-0.23, 0.4090],
//   [-0.22, 0.4129],
//   [-0.21, 0.4168],
//   [-0.20, 0.4207],

//   [-0.19, 0.4247],
//   [-0.18, 0.4286],
//   [-0.17, 0.4325],
//   [-0.16, 0.4364],
//   [-0.15, 0.4404],
//   [-0.14, 0.4443],
//   [-0.13, 0.4483],
//   [-0.12, 0.4522],
//   [-0.11, 0.4562],
//   [-0.10, 0.4602],

//   [-0.09, 0.4641],
//   [-0.08, 0.4681],
//   [-0.07, 0.4721],
//   [-0.06, 0.4761],
//   [-0.05, 0.4801],
//   [-0.04, 0.4840],
//   [-0.03, 0.4880],
//   [-0.02, 0.4920],
//   [-0.01, 0.4960],
//   // [-0.00, 0.5000],

//   [0.00, 0.5000],
//   [0.01, 0.5040],
//   [0.02, 0.5080],
//   [0.03, 0.5120],
//   [0.04, 0.5160],
//   [0.05, 0.5199],
//   [0.06, 0.5239],
//   [0.07, 0.5279],
//   [0.08, 0.5319],
//   [0.09, 0.5359],

//   [0.10, 0.5398],
//   [0.11, 0.5438],
//   [0.12, 0.5478],
//   [0.13, 0.5517],
//   [0.14, 0.5557],
//   [0.15, 0.5596],
//   [0.16, 0.5636],
//   [0.17, 0.5675],
//   [0.18, 0.5714],
//   [0.19, 0.5753],

//   [0.20, 0.5793],
//   [0.21, 0.5832],
//   [0.22, 0.5871],
//   [0.23, 0.5910],
//   [0.24, 0.5948],
//   [0.25, 0.5987],
//   [0.26, 0.6026],
//   [0.27, 0.6064],
//   [0.28, 0.6103],
//   [0.29, 0.6141],

//   [0.30, 0.6179],
//   [0.31, 0.6217],
//   [0.32, 0.6255],
//   [0.33, 0.6293],
//   [0.34, 0.6331],
//   [0.35, 0.6368],
//   [0.36, 0.6406],
//   [0.37, 0.6443],
//   [0.38, 0.6480],
//   [0.39, 0.6517],

//   [0.40, 0.6554],
//   [0.41, 0.6591],
//   [0.42, 0.6628],
//   [0.43, 0.6664],
//   [0.44, 0.6700],
//   [0.45, 0.6736],
//   [0.46, 0.6772],
//   [0.47, 0.6808],
//   [0.48, 0.6844],
//   [0.49, 0.6879],

//   [0.50, 0.6915],
//   [0.51, 0.6950],
//   [0.52, 0.6985],
//   [0.53, 0.7019],
//   [0.54, 0.7054],
//   [0.55, 0.7088],
//   [0.56, 0.7123],
//   [0.57, 0.7157],
//   [0.58, 0.7190],
//   [0.59, 0.7224],

//   [0.60, 0.7257],
//   [0.61, 0.7291],
//   [0.62, 0.7324],
//   [0.63, 0.7357],
//   [0.64, 0.7389],
//   [0.65, 0.7422],
//   [0.66, 0.7454],
//   [0.67, 0.7486],
//   [0.68, 0.7517],
//   [0.69, 0.7549],

//   [0.70, 0.7580],
//   [0.71, 0.7611],
//   [0.72, 0.7642],
//   [0.73, 0.7673],
//   [0.74, 0.7704],
//   [0.75, 0.7734],
//   [0.76, 0.7764],
//   [0.77, 0.7794],
//   [0.78, 0.7823],
//   [0.79, 0.7852],

//   [0.80, 0.7881],
//   [0.81, 0.7910],
//   [0.82, 0.7939],
//   [0.83, 0.7967],
//   [0.84, 0.7995],
//   [0.85, 0.8023],
//   [0.86, 0.8051],
//   [0.87, 0.8078],
//   [0.88, 0.8106],
//   [0.89, 0.8133],

//   [0.90, 0.8159],
//   [0.91, 0.8186],
//   [0.92, 0.8212],
//   [0.93, 0.8238],
//   [0.94, 0.8264],
//   [0.95, 0.8289],
//   [0.96, 0.8315],
//   [0.97, 0.8340],
//   [0.98, 0.8365],
//   [0.99, 0.8389],

//   [1.00, 0.8413],
//   [1.01, 0.8438],
//   [1.02, 0.8461],
//   [1.03, 0.8485],
//   [1.04, 0.8508],
//   [1.05, 0.8531],
//   [1.06, 0.8554],
//   [1.07, 0.8577],
//   [1.08, 0.8599],
//   [1.09, 0.8621],

//   [1.10, 0.8643],
//   [1.11, 0.8665],
//   [1.12, 0.8686],
//   [1.13, 0.8708],
//   [1.14, 0.8729],
//   [1.15, 0.8749],
//   [1.16, 0.8770],
//   [1.17, 0.8790],
//   [1.18, 0.8810],
//   [1.19, 0.8830],

//   [1.20, 0.8849],
//   [1.21, 0.8869],
//   [1.22, 0.8888],
//   [1.23, 0.8907],
//   [1.24, 0.8925],
//   [1.25, 0.8944],
//   [1.26, 0.8962],
//   [1.27, 0.8980],
//   [1.28, 0.8997],
//   [1.29, 0.9015],

//   [1.30, 0.9032],
//   [1.31, 0.9049],
//   [1.32, 0.9066],
//   [1.33, 0.9082],
//   [1.34, 0.9099],
//   [1.35, 0.9115],
//   [1.36, 0.9131],
//   [1.37, 0.9147],
//   [1.38, 0.9162],
//   [1.39, 0.9177],

//   [1.40, 0.9192],
//   [1.41, 0.9207],
//   [1.42, 0.9222],
//   [1.43, 0.9236],
//   [1.44, 0.9251],
//   [1.45, 0.9265],
//   [1.46, 0.9279],
//   [1.47, 0.9292],
//   [1.48, 0.9306],
//   [1.49, 0.9319],

//   [1.50, 0.9332],
//   [1.51, 0.9345],
//   [1.52, 0.9357],
//   [1.53, 0.9370],
//   [1.54, 0.9382],
//   [1.55, 0.9394],
//   [1.56, 0.9406],
//   [1.57, 0.9418],
//   [1.58, 0.9429],
//   [1.59, 0.9441],

//   [1.60, 0.9452],
//   [1.61, 0.9463],
//   [1.62, 0.9474],
//   [1.63, 0.9484],
//   [1.64, 0.9495],
//   [1.65, 0.9505],
//   [1.66, 0.9515],
//   [1.67, 0.9525],
//   [1.68, 0.9535],
//   [1.69, 0.9545],

//   [1.70, 0.9554],
//   [1.71, 0.9564],
//   [1.72, 0.9573],
//   [1.73, 0.9582],
//   [1.74, 0.9591],
//   [1.75, 0.9599],
//   [1.76, 0.9608],
//   [1.77, 0.9616],
//   [1.78, 0.9625],
//   [1.79, 0.9633],

//   [1.80, 0.9641],
//   [1.81, 0.9649],
//   [1.82, 0.9656],
//   [1.83, 0.9664],
//   [1.84, 0.9671],
//   [1.85, 0.9678],
//   [1.86, 0.9686],
//   [1.87, 0.9693],
//   [1.88, 0.9699],
//   [1.89, 0.9706],

//   [1.90, 0.9713],
//   [1.91, 0.9719],
//   [1.92, 0.9726],
//   [1.93, 0.9732],
//   [1.94, 0.9738],
//   [1.95, 0.9744],
//   [1.96, 0.9750],
//   [1.97, 0.9756],
//   [1.98, 0.9761],
//   [1.99, 0.9767],

//   [2.00, 0.9772],
//   [2.01, 0.9778],
//   [2.02, 0.9783],
//   [2.03, 0.9788],
//   [2.04, 0.9793],
//   [2.05, 0.9798],
//   [2.06, 0.9803],
//   [2.07, 0.9808],
//   [2.08, 0.9812],
//   [2.09, 0.9817],

//   [2.10, 0.9821],
//   [2.11, 0.9826],
//   [2.12, 0.9830],
//   [2.13, 0.9834],
//   [2.14, 0.9838],
//   [2.15, 0.9842],
//   [2.16, 0.9846],
//   [2.17, 0.9850],
//   [2.18, 0.9854],
//   [2.19, 0.9857],

//   [2.20, 0.9861],
//   [2.21, 0.9864],
//   [2.22, 0.9868],
//   [2.23, 0.9871],
//   [2.24, 0.9875],
//   [2.25, 0.9878],
//   [2.26, 0.9881],
//   [2.27, 0.9884],
//   [2.28, 0.9887],
//   [2.29, 0.9890],

//   [2.30, 0.9893],
//   [2.31, 0.9896],
//   [2.32, 0.9898],
//   [2.33, 0.9901],
//   [2.34, 0.9904],
//   [2.35, 0.9906],
//   [2.36, 0.9909],
//   [2.37, 0.9911],
//   [2.38, 0.9913],
//   [2.39, 0.9916],

//   [2.40, 0.9918],
//   [2.41, 0.9920],
//   [2.42, 0.9922],
//   [2.43, 0.9925],
//   [2.44, 0.9927],
//   [2.45, 0.9929],
//   [2.46, 0.9931],
//   [2.47, 0.9932],
//   [2.48, 0.9934],
//   [2.49, 0.9936],

//   [2.50, 0.9938],
//   [2.51, 0.9940],
//   [2.52, 0.9941],
//   [2.53, 0.9943],
//   [2.54, 0.9945],
//   [2.55, 0.9946],
//   [2.56, 0.9948],
//   [2.57, 0.9949],
//   [2.58, 0.9951],
//   [2.59, 0.9952],

//   [2.60, 0.9953],
//   [2.61, 0.9955],
//   [2.62, 0.9956],
//   [2.63, 0.9957],
//   [2.64, 0.9959],
//   [2.65, 0.9960],
//   [2.66, 0.9961],
//   [2.67, 0.9962],
//   [2.68, 0.9963],
//   [2.69, 0.9964],

//   [2.70, 0.9965],
//   [2.71, 0.9966],
//   [2.72, 0.9967],
//   [2.73, 0.9968],
//   [2.74, 0.9969],
//   [2.75, 0.9970],
//   [2.76, 0.9971],
//   [2.77, 0.9972],
//   [2.78, 0.9973],
//   [2.79, 0.9974],

//   [2.80, 0.9974],
//   [2.81, 0.9975],
//   [2.82, 0.9976],
//   [2.83, 0.9977],
//   [2.84, 0.9977],
//   [2.85, 0.9978],
//   [2.86, 0.9979],
//   [2.87, 0.9979],
//   [2.88, 0.9980],
//   [2.89, 0.9981],

//   [2.90, 0.9981],
//   [2.91, 0.9982],
//   [2.92, 0.9982],
//   [2.93, 0.9983],
//   [2.94, 0.9984],
//   [2.95, 0.9984],
//   [2.96, 0.9985],
//   [2.97, 0.9985],
//   [2.98, 0.9986],
//   [2.99, 0.9986],

//   [3.00, 0.9987],
//   [3.01, 0.9987],
//   [3.02, 0.9987],
//   [3.03, 0.9988],
//   [3.04, 0.9988],
//   [3.05, 0.9989],
//   [3.06, 0.9989],
//   [3.07, 0.9989],
//   [3.08, 0.9990],
//   [3.09, 0.9990],

//   [3.10, 0.9990],
//   [3.11, 0.9991],
//   [3.12, 0.9991],
//   [3.13, 0.9991],
//   [3.14, 0.9992],
//   [3.15, 0.9992],
//   [3.16, 0.9992],
//   [3.17, 0.9992],
//   [3.18, 0.9993],
//   [3.19, 0.9993],

//   [3.20, 0.9993],
//   [3.21, 0.9993],
//   [3.22, 0.9994],
//   [3.23, 0.9994],
//   [3.24, 0.9994],
//   [3.25, 0.9994],
//   [3.26, 0.9994],
//   [3.27, 0.9995],
//   [3.28, 0.9995],
//   [3.29, 0.9995],

//   [3.30, 0.9995],
//   [3.31, 0.9995],
//   [3.32, 0.9995],
//   [3.33, 0.9996],
//   [3.34, 0.9996],
//   [3.35, 0.9996],
//   [3.36, 0.9996],
//   [3.37, 0.9996],
//   [3.38, 0.9996],
//   [3.39, 0.9997],

//   [3.40, 0.9997],
//   [3.41, 0.9997],
//   [3.42, 0.9997],
//   [3.43, 0.9997],
//   [3.44, 0.9997],
//   [3.45, 0.9997],
//   [3.46, 0.9997],
//   [3.47, 0.9997],
//   [3.48, 0.9997],
//   [3.49, 0.9998],

// ];
