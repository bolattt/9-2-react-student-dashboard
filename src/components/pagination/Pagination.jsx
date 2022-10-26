import { useEffect, useState } from "react";
import "./Pagination.css";
export default function Pagination({
  filteredStudents: students,
  setStudentsToDisplay,
  selectedCohort,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [showUpTo, setShowUpTo] = useState(5);
  const resultsPerPage = 10;
  const numOfPages = Math.ceil(students.length / resultsPerPage);
  // 10  =>  5 to 10  =>    10-5 , 10
  function showFiveAtATime() {
    Array.from({ length: 5 }, (n, i) => showUpTo - 5 + i).map((n, i) => (
      <button
        onClick={() => setCurrentPage(n)}
        key={i}
        className={n === currentPage ? "current-page" : ""}
      ></button>
    ));
  }
  //   useEffect(() => {

  //     showFiveAtATime()
  //   }, [showUpTo]);

  // if different cohort is selected reset current page
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCohort]);

  // if currentPage is changed,get students according to current page and change state
  useEffect(() => {
    let studentsOnCurrentPage;
    if (currentPage < numOfPages) {
      studentsOnCurrentPage = students.slice(
        resultsPerPage * (currentPage - 1),
        resultsPerPage * currentPage
      );
      console.log(resultsPerPage * (currentPage - 1));
      console.log(resultsPerPage * currentPage);
    } else if (currentPage === numOfPages) {
      studentsOnCurrentPage = students.slice(
        resultsPerPage * (currentPage - 1)
      );
    }
    setStudentsToDisplay(studentsOnCurrentPage);
  }, [currentPage, numOfPages, setStudentsToDisplay, students]);

  function handleClick(e) {
    if (e.target.id === "next") {
      setCurrentPage(currentPage + 1);
    } else if (e.target.id === "prev") {
      setCurrentPage(currentPage - 1);
    }
  }

  return (
    <div className="pagination">
      {numOfPages > 5 && (
        <button
          onClick={() => setShowUpTo(showUpTo - 5 > 5 ? showUpTo - 5 : 5)}
        >
          &lt;
        </button>
      )}

      <button
        className="prev"
        id="prev"
        onClick={handleClick}
        disabled={currentPage === 1 ? true : false}
      >
        Prev
      </button>
      {/* {Array.from({ length: numOfPages }, (_, i) => i + 1).map((n, i) => (
        <button
          onClick={() => setCurrentPage(n)}
          key={i}
          className={n === currentPage ? "current-page" : ""}
        >
          {n}
        </button>
      ))} */}

      {/* only show 5 pagination buttons at a time, if num of pages is over 5  */}

      {Array.from(
        { length: numOfPages > 5 ? 5 : numOfPages },
        (n, i) => showUpTo - 5 + i + 1
      ).map((n, i) => (
        <button
          onClick={() => setCurrentPage(n)}
          key={i}
          className={n === currentPage ? "current-page" : ""}
        >
          {n}
        </button>
      ))}
      <button
        id="next"
        className="next"
        onClick={handleClick}
        disabled={currentPage === numOfPages ? true : false}
      >
        Next
      </button>
      {numOfPages > 5 && (
        <button onClick={() => setShowUpTo(showUpTo + 5)}>&gt;</button>
      )}
    </div>
  );
}
