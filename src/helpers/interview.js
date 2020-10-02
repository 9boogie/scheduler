export default function getInterview(state, interview) {
  let result = {};
  const interviewers = state.interviewers;
  if (!interview) {
    return null;
  } else {
    result = interview;
    for (const interviewerId in interviewers) {
      if (interviewerId == interview.interviewer){
        result.interviewer = interviewers[interviewerId];
      }
    }
    return result;
  }
};