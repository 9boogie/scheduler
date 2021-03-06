// Get the interview data using interviewer id
export default function getInterview(state, interview) {
  let result = {};
  const interviewers = state.interviewers;
  if (!interview) {
    return null;
  } else {
    result = interview;
    for (const interviewerId in interviewers) {
      if (Number(interviewerId) === interview.interviewer) {
        result.interviewer = interviewers[interviewerId];
      }
    }
    return result;
  }
}
